"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatWithIA = void 0;
const generative_ai_1 = require("@google/generative-ai");
const index_1 = require("../index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const chatWithIA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "La pregunta es requerida" });
        }
        const entities = index_1.AppDataSource.entityMetadatas;
        let schemaDescription = "La base de datos es MySQL. Tienes las siguientes tablas y columnas:\n\n";
        entities.forEach(entity => {
            schemaDescription += `Tabla: ${entity.tableName}\n`;
            schemaDescription += `Columnas: ${entity.columns.map(col => `${col.databaseName} (${col.type})`).join(', ')}\n`;
            if (entity.relations.length > 0) {
                schemaDescription += `Relaciones: ${entity.relations.map(rel => {
                    return `${rel.propertyName} -> ${rel.inverseEntityMetadata.tableName}`;
                }).join(', ')}\n`;
            }
            schemaDescription += "\n";
        });
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
        const resultSql = yield model.generateContent(sqlPrompt);
        const responseSql = resultSql.response;
        let sqlQuery = responseSql.text().trim();
        sqlQuery = sqlQuery.replace(/```sql/g, '').replace(/```/g, '').trim();
        if (sqlQuery === "NO_SQL") {
            return res.json({
                answer: "No puedo responder a esa pregunta con la información disponible en la base de datos.",
                sql: null
            });
        }
        console.log("SQL Generado:", sqlQuery);
        let queryResult;
        try {
            queryResult = yield index_1.AppDataSource.query(sqlQuery);
        }
        catch (dbError) {
            console.error("Error SQL:", dbError);
            return res.status(400).json({
                message: "No se pudo interpretar la pregunta correctamente para generar una consulta válida.",
                error: dbError.message,
                sql: sqlQuery
            });
        }
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
        const resultAnswer = yield model.generateContent(answerPrompt);
        const finalAnswer = resultAnswer.response.text();
        return res.json({
            question,
            answer: finalAnswer,
            data: queryResult
        });
    }
    catch (error) {
        console.error("Error en ChatIA:", error);
        return res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : "Error interno del servidor" });
    }
});
exports.chatWithIA = chatWithIA;
