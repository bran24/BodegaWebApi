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
exports.BuscarClienteFiltro = exports.getPaginatedCliente = exports.deleteCliente = exports.searchCliente = exports.updateCliente = exports.listCliente = exports.listTipoDoc = exports.createCliente = void 0;
const index_1 = require("../index");
const clientes_1 = require("../core/entities/clientes");
const cliente_1 = require("../core/interactor/cliente");
const tipoDocumento_1 = require("../core/entities/tipoDocumento");
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { nombre, tipo_documento, numero_documento, direccion, correo, telefono, es_empresa } = req.body;
        const tipodoc = yield index_1.AppDataSource.getRepository(tipoDocumento_1.TipoDocumento).findOne({ where: { id: tipo_documento } });
        const clie = new clientes_1.Cliente();
        clie.nombre = nombre;
        clie.tipo_documento = tipodoc !== null && tipodoc !== void 0 ? tipodoc : null;
        clie.numero_documento = numero_documento !== null && numero_documento !== void 0 ? numero_documento : null;
        clie.direccion = direccion !== null && direccion !== void 0 ? direccion : null;
        clie.correo = correo !== null && correo !== void 0 ? correo : null;
        clie.telefono = telefono !== null && telefono !== void 0 ? telefono : null;
        ;
        clie.es_empresa = es_empresa !== null && es_empresa !== void 0 ? es_empresa : false;
        const clicorr = yield index_1.AppDataSource.getRepository(clientes_1.Cliente).findOne({
            where: { correo: correo, isActive: true }
        });
        if (clicorr) {
            return res.status(400).json({ message: "correo ya registrado" });
        }
        if (tipo_documento && numero_documento) {
            const clidoc = yield index_1.AppDataSource.getRepository(clientes_1.Cliente).findOne({
                where: { numero_documento, tipo_documento: { id: tipo_documento } },
                relations: ['tipo_documento']
            });
            if (clidoc) {
                return res.status(400).json({ message: "Número de documento ya registrado" });
            }
        }
        const result = yield (0, cliente_1.createClienteInteractor)(clie);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
});
exports.createCliente = createCliente;
const listTipoDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const prop = yield index_1.AppDataSource.getRepository(tipoDocumento_1.TipoDocumento).find({
            where: {
                isActive: true
            }
        });
        return res.json({ result: prop });
    }
    catch (error) {
        return res.status(500).json({ message: (_b = error.message) !== null && _b !== void 0 ? _b : error });
    }
});
exports.listTipoDoc = listTipoDoc;
const listCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const prop = yield index_1.AppDataSource.getRepository(clientes_1.Cliente).find({
            where: {
                isActive: true,
            }
        });
        return res.json({ result: prop });
    }
    catch (error) {
        return res.status(500).json({ message: (_c = error.message) !== null && _c !== void 0 ? _c : error });
    }
});
exports.listCliente = listCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const { id, nombre, tipo_documento, numero_documento, direccion, correo, telefono, es_empresa } = req.body;
        const tipodoc = yield index_1.AppDataSource.getRepository(tipoDocumento_1.TipoDocumento).findOne({ where: { id: tipo_documento } });
        const clieact = yield index_1.AppDataSource.getRepository(clientes_1.Cliente).findOne({ where: { id: id } });
        if (!clieact) {
            return res.status(400).json({ message: "cliente no existe" });
        }
        if (correo && (clieact === null || clieact === void 0 ? void 0 : clieact.correo) !== correo) {
            const clicorr = yield index_1.AppDataSource.getRepository(clientes_1.Cliente).findOne({
                where: { correo: correo, isActive: true }
            });
            if (clicorr && clicorr.id !== clieact.id) {
                return res.status(400).json({ message: "correo ya registrado" });
            }
        }
        if ((clieact.numero_documento != numero_documento) || (((_d = clieact.tipo_documento) === null || _d === void 0 ? void 0 : _d.id) !== tipo_documento)) {
            if (tipo_documento && numero_documento) {
                const clidoc = yield index_1.AppDataSource.getRepository(clientes_1.Cliente).findOne({
                    where: { numero_documento, tipo_documento: { id: tipo_documento }, isActive: true },
                    relations: ['tipo_documento'],
                });
                if (clidoc && clidoc.id !== clieact.id) {
                    return res.status(400).json({ message: " Número de documento ya registrado" });
                }
            }
        }
        const clie = new clientes_1.Cliente();
        clie.id = id;
        clie.nombre = nombre;
        clie.tipo_documento = tipodoc !== null && tipodoc !== void 0 ? tipodoc : null;
        clie.numero_documento = numero_documento !== null && numero_documento !== void 0 ? numero_documento : null;
        clie.direccion = direccion !== null && direccion !== void 0 ? direccion : null;
        clie.correo = correo !== null && correo !== void 0 ? correo : null;
        clie.telefono = telefono !== null && telefono !== void 0 ? telefono : null;
        clie.es_empresa = es_empresa !== null && es_empresa !== void 0 ? es_empresa : false;
        const result = yield (0, cliente_1.updateClienteInteractor)(clie);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_e = error.message) !== null && _e !== void 0 ? _e : error });
    }
});
exports.updateCliente = updateCliente;
const searchCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const { id } = req.params;
        const clie = yield index_1.AppDataSource.getRepository(clientes_1.Cliente).findOneBy({ id: +id });
        if (!clie) {
            return res.status(500).json({ message: "cliente no encontrado" });
        }
        return res.status(200).json({ result: clie });
    }
    catch (error) {
        return res.status(500).json({ message: (_f = error.message) !== null && _f !== void 0 ? _f : error });
    }
});
exports.searchCliente = searchCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const clie = yield index_1.AppDataSource.getRepository(clientes_1.Cliente).findOneBy({ id: +id });
    if (!clie) {
        return res.status(500).json({ message: "cliente no encontrado" });
    }
    const resp = yield (0, cliente_1.deleteClienteInteractor)(clie);
    return res.json({ message: `Cliente con id ${id} eliminado` });
});
exports.deleteCliente = deleteCliente;
const getPaginatedCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { query } = req.query;
        const offset = (page - 1) * limit;
        const all = req.query.all || "false";
        const cliente = index_1.AppDataSource.getRepository(clientes_1.Cliente);
        const qb = cliente
            .createQueryBuilder("c")
            .leftJoin("c.tipo_documento", "td")
            .where("c.isActive = true");
        if (query && query !== 'undefined') {
            qb.andWhere("c.nombre LIKE :q OR c.numero_documento LIKE :q", { q: `%${query}%` });
        }
        qb
            .select(["c.id", "c.numero_documento", "c.nombre", "c.direccion", "c.correo", "c.telefono", "c.es_empresa", "td.id", "td.nombre", "td.descripcion"])
            .orderBy("c.id", "ASC");
        if (all != "true") {
            qb.skip(offset)
                .take(limit);
        }
        const [clientes, totalItems] = yield qb.getManyAndCount();
        const totalPages = Math.ceil(totalItems / limit);
        res.json({
            clientes,
            totalItems,
            totalPages,
            currentPPOage: page,
        });
    }
    catch (error) {
        console.error('Error al obtener los clientees paginados:', error);
        return res.status(500).json({ message: 'Error al obtener clientees' });
    }
});
exports.getPaginatedCliente = getPaginatedCliente;
const BuscarClienteFiltro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        const clientes = yield index_1.AppDataSource.getRepository(clientes_1.Cliente)
            .createQueryBuilder("c")
            .where("c.nombre LIKE :q OR c.numero_documento LIKE :q", { q: `%${query}%` })
            .andWhere("c.isActive = true")
            .select(["c.id", "c.numero_documento", "c.nombre", "c.correo"])
            .limit(20)
            .getMany();
        return res.json({ result: clientes });
    }
    catch (error) {
        console.error('Error al buscar clientes', error);
        return res.status(500).json({ message: 'Error al buscar cliente por filtro' });
    }
});
exports.BuscarClienteFiltro = BuscarClienteFiltro;
