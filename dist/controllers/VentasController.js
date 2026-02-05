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
exports.getProximoNumero = exports.getPagFiltroVentas = exports.getVentaById = exports.listmetodopago = exports.listcomprobante = exports.listVentas = exports.cambiarEstadoVenta = exports.createVentas = void 0;
const index_1 = require("../index");
const entities_1 = require("../core/entities");
const class_transformer_1 = require("class-transformer");
const detalleVenta_dto_1 = require("../core/validators/detalleVenta.dto");
const class_validator_1 = require("class-validator");
const movimientoInventario_1 = require("../core/entities/movimientoInventario");
const createVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const queryRunner = index_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        const { clienteid, usuarioid, tipo_comprobanteid, metodopagoid, observacion, detalleVentas, pago, facturar } = req.body;
        const cliente = yield queryRunner.manager.findOne(entities_1.Cliente, { where: { id: clienteid } });
        const usuario = yield queryRunner.manager.findOne(entities_1.Usuario, { where: { id: usuarioid } });
        if (!cliente || !usuario) {
            return res.status(400).json({ message: "Faltan datos válidos para registrar la venta" });
        }
        for (const item of detalleVentas) {
            const detalleDto = (0, class_transformer_1.plainToInstance)(detalleVenta_dto_1.DetalleVentaDto, item);
            const errors = yield (0, class_validator_1.validate)(detalleDto);
            if (errors.length > 0) {
                const mensajes = errors.map(err => Object.values(err.constraints || {})).flat();
                return res.status(400).json({ message: "Error en detalle de venta", errors: mensajes });
            }
        }
        let subtotal = 0;
        let igv = 0;
        let total = 0;
        const productosMap = new Map();
        for (const item of detalleVentas) {
            const productoven = yield queryRunner.manager.findOne(entities_1.Producto, { where: { id: item.productoid } });
            if (!productoven) {
                return res.status(400).json({ message: 'Producto no encontrado' });
            }
            if (productoven.cantidad < item.cantidad) {
                return res.status(400).json({ message: `Stock insuficiente para ${productoven.nombre}` });
            }
            productosMap.set(item.productoid, productoven);
            const precio = Number(item.precio_unitario);
            const cantidad = Number(item.cantidad);
            const sub = precio * cantidad;
            subtotal += sub;
            if (productoven.afecta_igv) {
                igv += sub * 0.18;
            }
        }
        total = subtotal + igv;
        let estado = 'PENDIENTE';
        if (facturar) {
            estado = 'FACTURADO';
        }
        const tipoComprobante = yield queryRunner.manager.findOne(entities_1.TipoComprobante, { where: { id: tipo_comprobanteid } });
        const metodoPago = yield queryRunner.manager.findOne(entities_1.MetodoPago, { where: { id: metodopagoid } });
        if (!tipoComprobante || !metodoPago) {
            return res.status(400).json({ message: "Faltan datos válidos para registrar la venta" });
        }
        const ultimaventa = yield queryRunner.manager.findOne(entities_1.Ventas, {
            where: { tipo_comprobante: { id: tipo_comprobanteid } },
            order: { numero: "DESC" }
        });
        let sgtventa = 1;
        if ((ultimaventa === null || ultimaventa === void 0 ? void 0 : ultimaventa.numero) != null) {
            sgtventa = ultimaventa.numero + 1;
        }
        const serie = tipoComprobante.serie;
        const venta = new entities_1.Ventas();
        if (facturar) {
            venta.fecha_facturacion = new Date();
        }
        venta.cliente = cliente;
        venta.usuario = usuario;
        venta.fecha_venta = new Date();
        venta.tipo_comprobante = tipoComprobante;
        venta.subtotal = subtotal;
        venta.igv = igv;
        venta.total = total;
        venta.estado = estado;
        venta.observacion = observacion;
        venta.serie = serie;
        venta.numero = sgtventa;
        yield queryRunner.manager.save(venta);
        for (const detven of detalleVentas) {
            const prod = productosMap.get(detven.productoid);
            if (!prod) {
                return res.status(400).json({ message: `Producto con ID ${detven.productoid} no encontrado` });
            }
            const sub = detven.precio_unitario * detven.cantidad;
            const aplicaIgv = prod.afecta_igv ? sub * 0.18 : 0;
            const tot = sub + aplicaIgv;
            const detalleventa = new entities_1.DetalleVenta();
            detalleventa.producto = prod;
            detalleventa.precio_unitario = detven.precio_unitario;
            detalleventa.cantidad = detven.cantidad;
            detalleventa.subtotal = sub;
            detalleventa.afecta_igv = prod.afecta_igv;
            detalleventa.venta = venta;
            detalleventa.igv = aplicaIgv;
            detalleventa.total = tot;
            yield queryRunner.manager.save(detalleventa);
            prod.cantidad -= detven.cantidad;
            yield queryRunner.manager.save(prod);
            const mov = new entities_1.MovimientoInventario();
            mov.producto = prod;
            mov.cantidad = detven.cantidad;
            mov.referencia = `Venta ${(_a = venta.serie) !== null && _a !== void 0 ? _a : ""}-${(_b = venta.numero) !== null && _b !== void 0 ? _b : ""}`,
                mov.tipo = movimientoInventario_1.TipoMovimiento.SALIDA;
            yield queryRunner.manager.save(mov);
        }
        const pag = new entities_1.Pago();
        pag.venta = venta;
        pag.fecha = new Date();
        pag.monto = pago.monto;
        pag.vuelto = pago.vuelto;
        pag.metodoPago = { id: pago.metodoPagoid };
        pag.observacion = (_c = pago.observacion) !== null && _c !== void 0 ? _c : "";
        yield queryRunner.manager.save(pag);
        yield queryRunner.commitTransaction();
        return res.status(201).json({
            message: "Venta registrada correctamente"
        });
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        return res.status(500).json({
            message: (_d = error.message) !== null && _d !== void 0 ? _d : "Error al registrar la venta",
        });
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createVentas = createVentas;
const cambiarEstadoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    const queryRunner = index_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        const { id, estado } = req.body;
        if (!estado) {
            return res.status(400).json({ message: "Debe enviar el estado de la venta" });
        }
        if (estado === 'FACTURADO') {
            let ventaActual = yield queryRunner.manager.findOne(entities_1.Ventas, { where: { id: Number(id) } });
            if (!ventaActual) {
                return res.status(400).json({ message: `venta no encontrada` });
            }
            if (ventaActual.estado === "ANULADO") {
                return res.status(400).json({ message: "No se puede facturar una venta anulada" });
            }
            ventaActual.estado = 'FACTURADO';
            ventaActual.fecha_facturacion = new Date();
            yield queryRunner.manager.save(ventaActual);
            yield queryRunner.commitTransaction();
            return res.status(201).json({
                message: "Venta Facturada correctamente"
            });
        }
        else if (estado === 'ANULADO') {
            if (!id) {
                return res.status(400).json({ message: "Debe enviar el ID de la venta" });
            }
            const venta = yield queryRunner.manager.findOne(entities_1.Ventas, {
                where: { id: Number(id) },
                relations: ["detalleVentas", "detalleVentas.producto"],
            });
            if (!venta) {
                return res.status(404).json({ message: "Venta no encontrada" });
            }
            if (venta.estado === "ANULADO") {
                return res.status(400).json({ message: "La venta ya fue anulada anteriormente" });
            }
            for (const det of venta.detalleVentas) {
                const prod = det.producto;
                prod.cantidad += det.cantidad;
                yield queryRunner.manager.save(prod);
                const mov = new entities_1.MovimientoInventario();
                mov.producto = prod;
                mov.tipo = movimientoInventario_1.TipoMovimiento.ENTRADA;
                mov.cantidad = det.cantidad;
                mov.referencia = `Anulación venta ${(_e = venta.serie) !== null && _e !== void 0 ? _e : ""}-${(_f = venta.numero) !== null && _f !== void 0 ? _f : ""}`;
                yield queryRunner.manager.save(mov);
            }
            venta.estado = "ANULADO";
            yield queryRunner.manager.save(venta);
            yield queryRunner.commitTransaction();
            return res.status(200).json({
                message: "Venta anulada correctamente",
            });
        }
        else {
            return res.status(400).json({ message: "Estado no válido" });
        }
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        return res.status(500).json({
            message: (_g = error.message) !== null && _g !== void 0 ? _g : "Error al registrar la venta",
        });
    }
    finally {
        yield queryRunner.release();
    }
});
exports.cambiarEstadoVenta = cambiarEstadoVenta;
const listVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const ventas = yield index_1.AppDataSource.getRepository(entities_1.Ventas).find({
            where: {
                isActive: true,
            },
            select: {
                id: true, fecha_venta: true, fecha_facturacion: true, estado: true, total: true, serie: true,
                numero: true, cliente: { id: true, nombre: true },
                tipo_comprobante: { id: true, nombre: true }
            },
            relations: ["cliente", "tipo_comprobante", "metodoPago"],
            order: {
                fecha_creacion: "DESC"
            }
        });
        return res.json({ result: ventas });
    }
    catch (error) {
        return res.status(500).json({ message: (_h = error.message) !== null && _h !== void 0 ? _h : error });
    }
});
exports.listVentas = listVentas;
const listcomprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    try {
        const comprobantes = yield index_1.AppDataSource.getRepository(entities_1.TipoComprobante).find({
            where: {
                isActive: true,
            },
            select: {
                id: true, nombre: true, codigo_sunat: true, serie: true
            }
        });
        return res.json({ result: comprobantes });
    }
    catch (error) {
        return res.status(500).json({ message: (_j = error.message) !== null && _j !== void 0 ? _j : error });
    }
});
exports.listcomprobante = listcomprobante;
const listmetodopago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    try {
        const pago = yield index_1.AppDataSource.getRepository(entities_1.MetodoPago).find({
            where: {
                isActive: true,
            },
            select: {
                id: true, nombre: true
            }
        });
        return res.json({ result: pago });
    }
    catch (error) {
        return res.status(500).json({ message: (_k = error.message) !== null && _k !== void 0 ? _k : error });
    }
});
exports.listmetodopago = listmetodopago;
const getVentaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    try {
        const { id } = req.params;
        const venta = yield index_1.AppDataSource.getRepository(entities_1.Ventas)
            .createQueryBuilder("v")
            .leftJoinAndSelect("v.cliente", "cli")
            .leftJoinAndSelect("v.usuario", "us")
            .leftJoinAndSelect("v.tipo_comprobante", "tc")
            .leftJoinAndSelect("v.detalleVentas", "dv")
            .leftJoinAndSelect("dv.producto", "prod")
            .leftJoinAndSelect("v.pagos", "pag")
            .leftJoinAndSelect("pag.metodoPago", "mp")
            .where("v.id = :id AND v.isActive = true", { id: Number(id) })
            .select([
            "v.id",
            "v.fecha_venta",
            "v.fecha_facturacion",
            "v.fecha_creacion",
            "v.estado",
            "v.total",
            "v.serie",
            "v.numero",
            "v.observacion",
            "cli.id",
            "cli.nombre",
            "us.id",
            "us.username",
            "tc.id",
            "tc.nombre",
            "tc.codigo_sunat",
            "tc.serie",
            "dv.id",
            "dv.precio_unitario",
            "dv.cantidad",
            "dv.subtotal",
            "dv.afecta_igv",
            "dv.igv",
            "dv.total",
            "prod.id",
            "prod.nombre",
            "prod.precioVenta",
            "pag.id",
            "pag.fecha",
            "pag.monto",
            "pag.observacion",
            "pag.vuelto",
            "mp.id",
            "mp.nombre",
        ])
            .orderBy("dv.id", "ASC")
            .addOrderBy("pag.id", "ASC")
            .getOne();
        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        return res.json({ result: venta });
    }
    catch (error) {
        return res.status(500).json({ message: (_l = error.message) !== null && _l !== void 0 ? _l : error });
    }
});
exports.getVentaById = getVentaById;
const getPagFiltroVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const all = req.query.all || "false";
        const offset = (page - 1) * limit;
        const { estado, tipo_comprobanteid, fechaInicio, fechaFin, search } = req.query;
        const ventaRepo = index_1.AppDataSource.getRepository(entities_1.Ventas);
        const qb = ventaRepo
            .createQueryBuilder("v")
            .leftJoin("v.cliente", "cli")
            .leftJoin("v.tipo_comprobante", "tc")
            .where("v.isActive = true");
        if (estado && estado !== 'undefined')
            qb.andWhere("v.estado = :estado", { estado });
        if (tipo_comprobanteid && tipo_comprobanteid !== 'undefined')
            qb.andWhere("tc.id = :tipo_comprobanteid", { tipo_comprobanteid });
        if (fechaInicio && fechaInicio !== 'undefined' && fechaFin && fechaFin !== 'undefined') {
            qb.andWhere("v.fecha_venta BETWEEN :inicio AND :fin", { inicio: fechaInicio, fin: fechaFin });
        }
        if (search && search !== 'undefined') {
            qb.andWhere("(cli.nombre LIKE :search OR cli.numero_documento LIKE :search OR CONCAT(v.serie, '-', v.numero) LIKE :search)", {
                search: `%${search}%`
            });
        }
        qb.select([
            "v.id",
            "v.fecha_venta",
            "v.fecha_facturacion",
            "v.fecha_creacion",
            "v.estado",
            "v.total",
            "v.serie",
            "v.numero",
            "cli.id",
            "cli.nombre",
            "cli.numero_documento",
            "tc.id",
            "tc.nombre"
        ]);
        if (all === "true") {
            qb.orderBy("v.fecha_creacion", "ASC");
        }
        else {
            qb.orderBy("v.fecha_creacion", "ASC")
                .skip(offset)
                .take(limit);
        }
        const [ventas, totalItems] = yield qb.getManyAndCount();
        return res.json({
            ventas,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        });
    }
    catch (error) {
        console.error('Error al obtener los ventas paginados:', error);
        return res.status(500).json({ message: 'Error al obtener ventas' });
    }
});
exports.getPagFiltroVentas = getPagFiltroVentas;
const getProximoNumero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    try {
        const { id } = req.params;
        const tipoComprobante = yield index_1.AppDataSource.getRepository(entities_1.TipoComprobante)
            .findOne({ where: { id: Number(id), isActive: true } });
        if (!tipoComprobante) {
            return res.status(404).json({ message: "Tipo de comprobante no encontrado" });
        }
        const venta = yield index_1.AppDataSource.getRepository(entities_1.Ventas)
            .createQueryBuilder("v")
            .where("v.tipoComprobanteid = :id", { id: Number(id) })
            .orderBy("v.numero", "DESC")
            .getOne();
        const siguiente = venta ? venta.numero + 1 : 1;
        return res.json({
            serie: tipoComprobante.serie,
            siguiente_numero: siguiente
        });
    }
    catch (error) {
        return res.status(500).json({ message: (_m = error.message) !== null && _m !== void 0 ? _m : error });
    }
});
exports.getProximoNumero = getProximoNumero;
