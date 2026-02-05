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
exports.deletePermisos = exports.searchPermisos = exports.updatePermisos = exports.listPermisos = exports.createPermisos = void 0;
const index_1 = require("../index");
const entities_1 = require("../core/entities");
const permisos_1 = require("../core/interactor/permisos");
const createPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { nombre, descripcion } = req.body;
        const permisos = yield index_1.AppDataSource.getRepository(entities_1.Permisos).findOne({
            where: { nombre: nombre, isActive: true }
        });
        if (permisos) {
            throw new Error('Permiso ya existe');
        }
        const permiso = new entities_1.Permisos();
        permiso.nombre = nombre;
        permiso.descripcion = descripcion;
        const result = yield (0, permisos_1.createPermisosInteractor)(permiso);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
});
exports.createPermisos = createPermisos;
const listPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const prop = yield index_1.AppDataSource.getRepository(entities_1.TipoPermisos)
            .createQueryBuilder('tipoPermisos')
            .leftJoinAndSelect('tipoPermisos.permisos', 'permisos')
            .select(['tipoPermisos.id', 'tipoPermisos.nombre', 'tipoPermisos.descripcion', 'permisos.id', 'permisos.nombre', 'permisos.descripcion'])
            .where('tipoPermisos.isActive = :isActive', { isActive: true })
            .andWhere('permisos.isActive = :permisoActivo', { permisoActivo: true })
            .getMany();
        return res.json({ result: prop });
    }
    catch (error) {
        return res.status(500).json({ message: (_b = error.message) !== null && _b !== void 0 ? _b : error });
    }
});
exports.listPermisos = listPermisos;
const updatePermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { nombre, descripcion, id } = req.body;
        const permiso = yield index_1.AppDataSource.getTreeRepository(entities_1.Permisos).findOneBy({ id: id, isActive: true });
        if (!permiso) {
            return res.status(404).json({ message: "permiso no existe" });
        }
        permiso.nombre = nombre !== null && nombre !== void 0 ? nombre : permiso.nombre;
        permiso.descripcion = descripcion !== null && descripcion !== void 0 ? descripcion : permiso.descripcion;
        const result = yield (0, permisos_1.updatePermisosInteractor)(permiso);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_c = error.message) !== null && _c !== void 0 ? _c : error });
    }
});
exports.updatePermisos = updatePermisos;
const searchPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const id = +req.params.id;
        const permiso = yield index_1.AppDataSource.getRepository(entities_1.Permisos).findOneBy({ id: id });
        if (!permiso) {
            return res.status(404).json({ message: "No existe el permiso" });
        }
        return res.status(200).json({ result: permiso });
    }
    catch (error) {
        return res.status(500).json({ message: (_d = error.message) !== null && _d !== void 0 ? _d : error });
    }
});
exports.searchPermisos = searchPermisos;
const deletePermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const permisos = yield index_1.AppDataSource.getRepository(entities_1.Permisos).findOne({
            where: { id: +req.params.id, isActive: true },
        });
        if (!permisos) {
            return res.status(400).json({ message: "Permiso no existe" });
        }
        const result = yield (0, permisos_1.deletePermisosInteractor)(permisos);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_e = error.message) !== null && _e !== void 0 ? _e : error });
    }
});
exports.deletePermisos = deletePermisos;
