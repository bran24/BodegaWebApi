import { Response, Request } from 'express'
import { AppDataSource } from '../index'
import { Producto } from '../core/entities/producto'
import { Cliente } from "../core/entities/clientes"
import { Proveedor } from "../core/entities/proveedor"
import { Categoria } from "../core/entities/categoria"
import { Unidad } from "../core/entities/unidad"
import { Ventas } from "../core/entities/ventas"
import { DetalleVenta } from "../core/entities/detalleVenta"
import { Pago } from '../core/entities/pago'

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

        const ventaRepo = AppDataSource.getRepository(Ventas);
        const productoRepo = AppDataSource.getRepository(Producto);
        const detalleVentaRepo = AppDataSource.getRepository(DetalleVenta);

        // Ventas dia
        const ventasDiaResult = await ventaRepo
            .createQueryBuilder("v")
            .select("SUM(v.total)", "total")
            .where("v.isActive = :active", { active: true })
            .andWhere("v.estado != :estado", { estado: "ANULADO" })
            .andWhere("v.fecha_venta BETWEEN :start AND :end", { start: startOfDay, end: endOfDay })
            .getRawOne();

        const cantidadVentasDia = await ventaRepo
            .createQueryBuilder("v")
            .where("v.isActive = :active", { active: true })
            .andWhere("v.estado != :estado", { estado: "ANULADO" })
            .andWhere("v.fecha_venta BETWEEN :start AND :end", { start: startOfDay, end: endOfDay })
            .getCount();

        // Ventas Mes
        const ventasMesResult = await ventaRepo
            .createQueryBuilder("v")
            .select("SUM(v.total)", "total")
            .where("v.isActive = :active", { active: true })
            .andWhere("v.estado != :estado", { estado: "ANULADO" })
            .andWhere("v.fecha_venta BETWEEN :start AND :end", { start: startOfMonth, end: endOfMonth })
            .getRawOne();

        // Productos bajo stock (< 10)
        const productosBajoStock = await productoRepo
            .createQueryBuilder("p")
            .where("p.isActive = :active", { active: true })
            .andWhere("p.cantidad < :minStock", { minStock: 10 })
            .getCount();

        // Ventas últimos 7 días
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        // Reset time to start of that day
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const ventasUltimos7Dias = await ventaRepo
            .createQueryBuilder("v")
            .select("DATE(v.fecha_venta) as fecha, SUM(v.total) as total")
            .where("v.isActive = :active", { active: true })
            .andWhere("v.estado != :estado", { estado: "ANULADO" })
            .andWhere("v.fecha_venta >= :sevenDaysAgo", { sevenDaysAgo })
            .groupBy("DATE(v.fecha_venta)")
            .orderBy("DATE(v.fecha_venta)", "ASC")
            .getRawMany();

        // Productos más vendidos (Top 5)
        const productosMasVendidos = await detalleVentaRepo
            .createQueryBuilder("dv")
            .leftJoin("dv.venta", "v")
            .leftJoin("dv.producto", "p")
            .select("p.nombre", "nombre")
            .addSelect("SUM(dv.cantidad)", "cantidad")
            .where("v.isActive = :active", { active: true })
            .andWhere("v.estado != :estado", { estado: "ANULADO" })
            .groupBy("p.nombre")
            .orderBy("cantidad", "DESC")
            .limit(5)
            .getRawMany();

        // Últimas ventas (5 recientes)
        const ultimasVentas = await ventaRepo.find({
            where: { isActive: true },
            order: { fecha_creacion: "DESC" },
            take: 5,
            relations: ["cliente"]
        });

        // Formatear ultimas ventas
        const ultimasVentasFormatted = ultimasVentas.map(v => ({
            id: v.id,
            hora: v.fecha_venta instanceof Date ? v.fecha_venta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date(v.fecha_venta).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            cliente: v.cliente ? v.cliente.nombre : "Cliente General",
            total: Number(v.total),
            estado: v.estado
        }));

        return res.json({
            resumen: {
                totalVentasDia: ventasDiaResult?.total ? Number(ventasDiaResult.total) : 0,
                cantidadVentasDia: cantidadVentasDia,
                totalVentasMes: ventasMesResult?.total ? Number(ventasMesResult.total) : 0,
                productosBajoStock: productosBajoStock
            },
            ventasUltimos7Dias: ventasUltimos7Dias.map(v => ({
                fecha: typeof v.fecha === 'string' ? v.fecha : new Date(v.fecha).toISOString().split('T')[0],
                total: Number(v.total)
            })),
            productosMasVendidos: productosMasVendidos.map(p => ({
                nombre: p.nombre,
                cantidad: Number(p.cantidad)
            })),
            ultimasVentas: ultimasVentasFormatted
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? "Error en dashboard" });
    }
}



export const getReporteIngresos = async (req: Request, res: Response) => {
    try {

        const { fechaInicio, fechaFin, metodoPago, } = req.query;

        const all = req.query.all;

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;



        const pagoRepo = AppDataSource.getRepository(Pago);
        const queryBuilder = pagoRepo.createQueryBuilder("p")
            .leftJoin("p.metodoPago", "m")
            .select(["m.id AS metodoId", "m.nombre AS metodoNombre", "p.fecha AS fecha"])
            .addSelect("SUM(p.monto)", "total")
            .where("p.isActive = :active", { active: true });

        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

        if (fechaInicio && fechaInicio !== 'undefined' && fechaFin && fechaFin !== 'undefined') {
            const fin = new Date(fechaFin as string);
            fin.setHours(23, 59, 59, 999);
            queryBuilder.andWhere("p.fecha BETWEEN :start AND :end", { start: fechaInicio, end: fin });
        }

        if (metodoPago && metodoPago !== 'undefined') {
            queryBuilder.andWhere("m.id = :metodoPago", { metodoPago });

        }


        let ingresos = await queryBuilder
            .groupBy("m.id")
            .addGroupBy("m.nombre")
            .addGroupBy("p.fecha")
            .orderBy("p.fecha", "DESC")
            .offset(offset)
            .limit(limit)
            .getRawMany();

        if (all == 'true') {
            ingresos = await queryBuilder
                .groupBy("m.id")
                .addGroupBy("m.nombre")
                .addGroupBy("p.fecha")
                .orderBy("p.fecha", "DESC")
                .getRawMany();
        }







        // Para contar el total de grupos, hacemos una consulta separada
        const totalQuery = pagoRepo.createQueryBuilder("p")
            .leftJoin("p.metodoPago", "m")
            .where("p.isActive = :active", { active: true });

        if (fechaInicio && fechaInicio !== 'undefined' && fechaFin && fechaFin !== 'undefined') {
            const fin = new Date(fechaFin as string);
            fin.setHours(23, 59, 59, 999);
            totalQuery.andWhere("p.fecha BETWEEN :start AND :end", { start: fechaInicio, end: fin });
        }

        if (metodoPago && metodoPago !== 'undefined') {
            totalQuery.andWhere("m.id = :metodoPago", { metodoPago });
        }

        const totalResult = await totalQuery
            .select("COUNT(DISTINCT CONCAT(m.id, '-', p.fecha))", "count")
            .getRawOne();

        const totalItems = totalResult ? parseInt(totalResult.count) : 0;

        return res.json({
            ingresos,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit)
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? "Error en reporte de ingresos" });
    }
}