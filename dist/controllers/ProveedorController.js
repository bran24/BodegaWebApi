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
exports.getPaginatedProveedor = exports.deleteProveedor = exports.searchProveedor = exports.updateProveedor = exports.listProveedor = exports.createProveedor = void 0;
const index_1 = require("../index");
const proveedor_1 = require("../core/entities/proveedor");
const proveedor_2 = require("../core/interactor/proveedor");
const createProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { nombre, descripcion, contacto, email, telefono, direccion, pais } = req.body;
        const prov = new proveedor_1.Proveedor();
        prov.nombre = nombre;
        prov.descripcion = descripcion;
        prov.contacto = contacto;
        prov.email = email;
        prov.telefono = telefono;
        prov.direccion = direccion;
        prov.pais = pais;
        const result = yield (0, proveedor_2.createProveedorInteractor)(prov);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
});
exports.createProveedor = createProveedor;
const listProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const prop = yield index_1.AppDataSource.getRepository(proveedor_1.Proveedor).find({
            where: {
                isActive: true,
            }
        });
        return res.json({ result: prop });
    }
    catch (error) {
        return res.status(500).json({ message: (_b = error.message) !== null && _b !== void 0 ? _b : error });
    }
});
exports.listProveedor = listProveedor;
const updateProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { id, nombre, descripcion, contacto, email, telefono, direccion, pais } = req.body;
        const prov = new proveedor_1.Proveedor();
        prov.id = id;
        prov.nombre = nombre;
        prov.descripcion = descripcion;
        prov.contacto = contacto;
        prov.email = email;
        prov.telefono = telefono;
        prov.direccion = direccion;
        prov.pais = pais;
        const result = yield (0, proveedor_2.updateProveedorInteractor)(prov);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_c = error.message) !== null && _c !== void 0 ? _c : error });
    }
});
exports.updateProveedor = updateProveedor;
const searchProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { id } = req.params;
        const prov = yield index_1.AppDataSource.getRepository(proveedor_1.Proveedor).findOneBy({ id: +id });
        if (!prov) {
            return res.status(500).json({ message: "proveedor no encontrado" });
        }
        return res.status(200).json({ result: prov });
    }
    catch (error) {
        return res.status(500).json({ message: (_d = error.message) !== null && _d !== void 0 ? _d : error });
    }
});
exports.searchProveedor = searchProveedor;
const deleteProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prov = yield index_1.AppDataSource.getRepository(proveedor_1.Proveedor).findOneBy({ id: +id });
    if (!prov) {
        return res.status(500).json({ message: "producto no encontrado" });
    }
    const resp = yield (0, proveedor_2.deleteProveedorInteractor)(prov);
    return res.json({ message: `Proveedor con id ${id} eliminado` });
});
exports.deleteProveedor = deleteProveedor;
const getPaginatedProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const query = req.query.query;
        const all = req.query.all || "false";
        const offset = (page - 1) * limit;
        const provRepository = index_1.AppDataSource.getRepository(proveedor_1.Proveedor);
        const qb = provRepository.createQueryBuilder("p")
            .where("p.isActive = :isActive", { isActive: true });
        if (query && query !== "undefined") {
            qb.andWhere("p.nombre LIKE :query", { query: `%${query}%` });
        }
        if (all === "true") {
            qb.orderBy("p.id", "ASC");
        }
        else {
            qb.orderBy("p.id", "ASC")
                .skip(offset)
                .take(limit);
        }
        const [proveedores, totalItems] = yield qb.getManyAndCount();
        const totalPages = Math.ceil(totalItems / limit);
        res.json({
            proveedores,
            totalItems,
            totalPages,
            currentPage: page,
        });
    }
    catch (error) {
        console.error('Error al obtener los proveedores paginados:', error);
        return res.status(500).json({ message: 'Error al obtener proveedores' });
    }
});
exports.getPaginatedProveedor = getPaginatedProveedor;
