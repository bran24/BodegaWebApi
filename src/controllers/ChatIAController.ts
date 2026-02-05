
import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AppDataSource } from '../index';
import dotenv from 'dotenv';

dotenv.config();

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const chatWithIA = async (req: Request, res: Response) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "La pregunta es requerida" });
        }

        // 1. Obtener el esquema de la base de datos desde TypeORM
        const entities = AppDataSource.entityMetadatas;
        let schemaDescription = "La base de datos es MySQL. Tienes las siguientes tablas y columnas:\n\n";

        entities.forEach(entity => {
            schemaDescription += `Tabla: ${entity.tableName}\n`;
            schemaDescription += `Columnas: ${entity.columns.map(col => `${col.databaseName} (${col.type})`).join(', ')}\n`;

            // Relaciones para ayudar al contexto
            if (entity.relations.length > 0) {
                schemaDescription += `Relaciones: ${entity.relations.map(rel => {
                    return `${rel.propertyName} -> ${rel.inverseEntityMetadata.tableName}`;
                }).join(', ')}\n`;
            }
            schemaDescription += "\n";
        });

        // 2. Generar el prompt para SQL
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const sqlPrompt = `
        Eres un experto en SQL y bases de datos MySQL.
        Tu tarea es convertir una pregunta en lenguaje natural a una consulta SQL válida.
        
        Contexto de la Base de Datos:
        ${schemaDescription}

        Reglas de Negocio Importantes:
        1. Para calcular "ventas", "ingresos" o "dinero", SIEMPRE suma la columna 'total' de la tabla 'ventas'. NO uses subtotal ni precios unitarios.
        2. Al consultar ventas, SIEMPRE filtra por "estado != 'ANULADO'" y "isActive = 1" (o true).
        3. Para contar "cantidad de productos vendidos", usa la tabla 'detalle_venta' y suma la columna 'cantidad'.
        4. Si preguntan por el "producto más vendido", agrupa por producto en 'detalle_venta' y ordena por la suma de cantidad descendente.
        5. "Hoy" se refiere a la fecha actual del sistema (CURDATE() o funciones equivalentes en MySQL).

        Reglas Generales:
        1. Responde SOLAMENTE con el código SQL puro.
        2. No incluyas explicaciones, ni bloques de código markdown (como \`\`\`sql).
        3. Usa consultas SELECT solamente (lectura). No realices INSERT, UPDATE o DELETE.
        4. Si la pregunta no se puede responder con la base de datos, devuelve "NO_SQL".
        
        Pregunta: "${question}"
        SQL:
        `;

        const resultSql = await model.generateContent(sqlPrompt);
        const responseSql = resultSql.response;
        let sqlQuery = responseSql.text().trim();

        // Limpieza básica por si Gemini devuelve markdown
        sqlQuery = sqlQuery.replace(/```sql/g, '').replace(/```/g, '').trim();

        if (sqlQuery === "NO_SQL") {
            return res.json({
                answer: "No puedo responder a esa pregunta con la información disponible en la base de datos.",
                sql: null
            });
        }

        console.log("SQL Generado:", sqlQuery);

        // 3. Ejecutar la consulta SQL
        let queryResult;
        try {
            queryResult = await AppDataSource.query(sqlQuery);
        } catch (dbError: any) {
            console.error("Error SQL:", dbError);
            return res.status(400).json({
                message: "No se pudo interpretar la pregunta correctamente para generar una consulta válida.",
                error: dbError.message,
                sql: sqlQuery
            });
        }

        // 4. Generar respuesta en lenguaje natural basada en los resultados
        const answerPrompt = `
        Eres un asistente de análisis de datos para una Bodega.
        
        Pregunta original: "${question}"
        Consulta SQL ejecutada: "${sqlQuery}"
        Resultados de la base de datos (JSON):
        ${JSON.stringify(queryResult, null, 2)}

        Instrucciones:
        1. Responde a la pregunta original basándote en los resultados proporcionados.
        2. Sé amable, conciso y profesional.
        3. Si el resultado está vacío, indica que no se encontraron datos.
        
        Respuesta:
        `;

        const resultAnswer = await model.generateContent(answerPrompt);
        const finalAnswer = resultAnswer.response.text();

        return res.json({
            question,
            answer: finalAnswer,
            data: queryResult
        });

    } catch (error: any) {
        console.error("Error en ChatIA:", error);
        return res.status(500).json({ message: error.message ?? "Error interno del servidor" });
    }
};
