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
exports.deleteRoles = exports.searchRoles = exports.updateRoles = exports.listRoles = exports.createRoles = void 0;
const index_1 = require("../index");
const entities_1 = require("../core/entities");
const roles_1 = require("../core/interactor/roles");
const createRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { nombre, descripcion } = req.body;
        const rol = new entities_1.Roles();
        rol.nombre = nombre;
        rol.descripcion = descripcion;
        const result = yield (0, roles_1.createRolesInteractor)(rol);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
});
exports.createRoles = createRoles;
const listRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const prop = yield index_1.AppDataSource.getRepository(entities_1.Roles).find({ where: { isActive: true } });
        return res.json({ result: prop });
    }
    catch (error) {
        return res.status(500).json({ message: (_b = error.message) !== null && _b !== void 0 ? _b : error });
    }
});
exports.listRoles = listRoles;
const updateRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { id, nombre, descripcion } = req.body;
        const rol = yield index_1.AppDataSource.getTreeRepository(entities_1.Roles).findOneBy({ id: id, isActive: true });
        if (!rol) {
            return res.status(404).json({ message: "rol no existe" });
        }
        rol.nombre = nombre !== null && nombre !== void 0 ? nombre : rol.nombre;
        rol.descripcion = descripcion;
        const result = yield (0, roles_1.updateRolesInteractor)(rol);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_c = error.message) !== null && _c !== void 0 ? _c : error });
    }
});
exports.updateRoles = updateRoles;
const searchRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const id = +req.params.id;
        const rol = yield index_1.AppDataSource.getRepository(entities_1.Roles).findOneBy({ id: id });
        if (!rol) {
            return res.status(404).json({ message: "No existe el rol" });
        }
        return res.status(200).json({ result: rol });
    }
    catch (error) {
        return res.status(500).json({ message: (_d = error.message) !== null && _d !== void 0 ? _d : error });
    }
});
exports.searchRoles = searchRoles;
const deleteRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const roles = yield index_1.AppDataSource.getRepository(entities_1.Roles).findOne({
            where: { id: +req.params.id, isActive: true },
        });
        if (!roles) {
            return res.status(400).json({ message: "Rol no existe" });
        }
        const result = yield (0, roles_1.deleteRolesInteractor)(roles);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_e = error.message) !== null && _e !== void 0 ? _e : error });
    }
});
exports.deleteRoles = deleteRoles;
