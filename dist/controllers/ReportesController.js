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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReporteIngresos = exports.getDashboardData = void 0;
const index_1 = require("../index");
const producto_1 = require("../core/entities/producto");
const ventas_1 = require("../core/entities/ventas");
const detalleVenta_1 = require("../core/entities/detalleVenta");
const pago_1 = require("../core/entities/pago");
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
        const ventaRepo = index_1.AppDataSource.getRepository(ventas_1.Ventas);
        const productoRepo = index_1.AppDataSource.getRepository(producto_1.Producto);
        const detalleVentaRepo = index_1.AppDataSource.getRepository(detalleVenta_1.DetalleVenta);
        const ventasDiaResult = yield ventaRepo
            .createQueryBuilder("v")
            .select("SUM(v.total)", "total")
            .where("v.isActive = :active", { active: true })
            .andWhere("v.estado != :estado", { estado: "ANULADO" })
            .andWhere("v.fecha_venta BETWEEN :start AND :end", { start: startOfDay, end: endOfDay })
            .getRawOne();
        const cantidadVentasDia = yield ventaRepo
            .createQueryBuilder("v")
            .where("v.isActive = :active", { active: true })
            .andWhere("v.estado != :estado", { estado: "ANULADO" })
            .andWhere("v.fecha_venta BETWEEN :start AND :end", { start: startOfDay, end: endOfDay })
            .getCount();
        const ventasMesResult = yield ventaRepo
            .createQueryBuilder("v")
            .select("SUM(v.total)", "total")
            .where("v.isActive = :active", { active: true })
            .andWhere("v.estado != :estado", { estado: "ANULADO" })
            .andWhere("v.fecha_venta BETWEEN :start AND :end", { start: startOfMonth, end: endOfMonth })
            .getRawOne();
        const productosBajoStock = yield productoRepo
            .createQueryBuilder("p")
            .where("p.isActive = :active", { active: true })
            .andWhere("p.cantidad < :minStock", { minStock: 10 })
            .getCount();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);
        const ventasUltimos7Dias = yield ventaRepo
            .createQueryBuilder("v")
            .select("DATE(v.fecha_venta) as fecha, SUM(v.total) as total")
            .where("v.isActive = :active", { active: true })
            .andWhere("v.estado != :estado", { estado: "ANULADO" })
            .andWhere("v.fecha_venta >= :sevenDaysAgo", { sevenDaysAgo })
            .groupBy("DATE(v.fecha_venta)")
            .orderBy("DATE(v.fecha_venta)", "ASC")
            .getRawMany();
        const productosMasVendidos = yield detalleVentaRepo
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
        const ultimasVentas = yield ventaRepo.find({
            where: { isActive: true },
            order: { fecha_creacion: "DESC" },
            take: 5,
            relations: ["cliente"]
        });
        const ultimasVentasFormatted = ultimasVentas.map(v => ({
            id: v.id,
            hora: v.fecha_venta instanceof Date ? v.fecha_venta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date(v.fecha_venta).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            cliente: v.cliente ? v.cliente.nombre : "Cliente General",
            total: Number(v.total),
            estado: v.estado
        }));
        return res.json({
            resumen: {
                totalVentasDia: (ventasDiaResult === null || ventasDiaResult === void 0 ? void 0 : ventasDiaResult.total) ? Number(ventasDiaResult.total) : 0,
                cantidadVentasDia: cantidadVentasDia,
                totalVentasMes: (ventasMesResult === null || ventasMesResult === void 0 ? void 0 : ventasMesResult.total) ? Number(ventasMesResult.total) : 0,
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
    }
    catch (error) {
        return res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : "Error en dashboard" });
    }
});
exports.getDashboardData = getDashboardData;
const getReporteIngresos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { fechaInicio, fechaFin, metodoPago, } = req.query;
        const all = req.query.all;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const pagoRepo = index_1.AppDataSource.getRepository(pago_1.Pago);
        const queryBuilder = pagoRepo.createQueryBuilder("p")
            .leftJoin("p.metodoPago", "m")
            .select(["m.id AS metodoId", "m.nombre AS metodoNombre", "p.fecha AS fecha"])
            .addSelect("SUM(p.monto)", "total")
            .where("p.isActive = :active", { active: true });
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        if (fechaInicio && fechaInicio !== 'undefined' && fechaFin && fechaFin !== 'undefined') {
            const fin = new Date(fechaFin);
            fin.setHours(23, 59, 59, 999);
            queryBuilder.andWhere("p.fecha BETWEEN :start AND :end", { start: fechaInicio, end: fin });
        }
        if (metodoPago && metodoPago !== 'undefined') {
            queryBuilder.andWhere("m.id = :metodoPago", { metodoPago });
        }
        let ingresos = yield queryBuilder
            .groupBy("m.id")
            .addGroupBy("m.nombre")
            .addGroupBy("p.fecha")
            .orderBy("p.fecha", "DESC")
            .offset(offset)
            .limit(limit)
            .getRawMany();
        if (all == 'true') {
            ingresos = yield queryBuilder
                .groupBy("m.id")
                .addGroupBy("m.nombre")
                .addGroupBy("p.fecha")
                .orderBy("p.fecha", "DESC")
                .getRawMany();
        }
        const totalQuery = pagoRepo.createQueryBuilder("p")
            .leftJoin("p.metodoPago", "m")
            .where("p.isActive = :active", { active: true });
        if (fechaInicio && fechaInicio !== 'undefined' && fechaFin && fechaFin !== 'undefined') {
            const fin = new Date(fechaFin);
            fin.setHours(23, 59, 59, 999);
            totalQuery.andWhere("p.fecha BETWEEN :start AND :end", { start: fechaInicio, end: fin });
        }
        if (metodoPago && metodoPago !== 'undefined') {
            totalQuery.andWhere("m.id = :metodoPago", { metodoPago });
        }
        const totalResult = yield totalQuery
            .select("COUNT(DISTINCT CONCAT(m.id, '-', p.fecha))", "count")
            .getRawOne();
        const totalItems = totalResult ? parseInt(totalResult.count) : 0;
        return res.json({
            ingresos,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit)
        });
    }
    catch (error) {
        return res.status(500).json({ message: (_b = error.message) !== null && _b !== void 0 ? _b : "Error en reporte de ingresos" });
    }
});
exports.getReporteIngresos = getReporteIngresos;
