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
exports.deleteUnidad = exports.searchUnidad = exports.updateUnidad = exports.listUnidad = exports.createUnidad = void 0;
const index_1 = require("../index");
const unidad_1 = require("../core/entities/unidad");
const unidad_2 = require("../core/interactor/unidad");
const createUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { nombre } = req.body;
        const existeUnidad = yield index_1.AppDataSource.getRepository(unidad_1.Unidad).findOneBy({ nombre: nombre, isActive: true });
        if (!existeUnidad) {
            return res.status(400).json({ message: "Unidad ya existe" });
        }
        const cat = new unidad_1.Unidad();
        cat.nombre = nombre;
        const result = yield (0, unidad_2.createUnidadInteractor)(cat);
        return res.json({ result: result });
    }
    catch (error) {
        throw res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
});
exports.createUnidad = createUnidad;
const listUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const prop = yield index_1.AppDataSource.getRepository(unidad_1.Unidad).find({
            where: {
                isActive: true,
            },
        });
        return res.json({ result: prop });
    }
    catch (error) {
        return res.status(500).json({ message: (_b = error.message) !== null && _b !== void 0 ? _b : error });
    }
});
exports.listUnidad = listUnidad;
const updateUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { id, nombre, } = req.body;
        const existeUnidad = yield index_1.AppDataSource.getRepository(unidad_1.Unidad).findOneBy({ id: id });
        if (!existeUnidad) {
            return res.status(400).json({ message: "Unidad no encontrada" });
        }
        const cat = new unidad_1.Unidad();
        cat.id = id;
        cat.nombre = nombre;
        const result = yield (0, unidad_2.updateUnidadInteractor)(cat);
        return res.json({ result: result });
    }
    catch (error) {
        throw res.status(500).json({ message: (_c = error.message) !== null && _c !== void 0 ? _c : error });
    }
});
exports.updateUnidad = updateUnidad;
const searchUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { id } = req.params;
        const prop = yield index_1.AppDataSource.getRepository(unidad_1.Unidad).findOneBy({ id: +id });
        if (!prop) {
            return res.status(500).json({ message: "unidad no encontrado" });
        }
        return res.status(200).json({ result: prop });
    }
    catch (error) {
        throw res.status(500).json({ message: (_d = error.message) !== null && _d !== void 0 ? _d : error });
    }
});
exports.searchUnidad = searchUnidad;
const deleteUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prop = yield index_1.AppDataSource.getRepository(unidad_1.Unidad).findOneBy({ id: +id });
    if (!prop) {
        return res.status(500).json({ message: "unidad no encontrado" });
    }
    const resp = yield (0, unidad_2.deleteUnidadInteractor)(prop);
    return res.json({ message: `Unidad con id ${id} eliminado` });
});
exports.deleteUnidad = deleteUnidad;
