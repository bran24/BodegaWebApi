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
exports.deleteCategoria = exports.searchCategoria = exports.updateCategoria = exports.listCategoria = exports.createCategoria = void 0;
const index_1 = require("../index");
const categoria_1 = require("../core/entities/categoria");
const categoria_2 = require("../core/interactor/categoria");
const createCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { nombre } = req.body;
        const existeCategoria = yield index_1.AppDataSource.getRepository(categoria_1.Categoria).findOneBy({ nombre: nombre });
        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria ya existe" });
        }
        const cat = new categoria_1.Categoria();
        cat.nombre = nombre;
        const result = yield (0, categoria_2.createCategoriaInteractor)(cat);
        return res.json({ result: result });
    }
    catch (error) {
        throw res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
});
exports.createCategoria = createCategoria;
const listCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const prop = yield index_1.AppDataSource.getRepository(categoria_1.Categoria).find({
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
exports.listCategoria = listCategoria;
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { id, nombre, } = req.body;
        const existeCategoria = yield index_1.AppDataSource.getRepository(categoria_1.Categoria).findOneBy({ id: id });
        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria no encontrada" });
        }
        const cat = new categoria_1.Categoria();
        cat.id = id;
        cat.nombre = nombre;
        const result = yield (0, categoria_2.updateCategoriaInteractor)(cat);
        return res.json({ result: result });
    }
    catch (error) {
        throw res.status(500).json({ message: (_c = error.message) !== null && _c !== void 0 ? _c : error });
    }
});
exports.updateCategoria = updateCategoria;
const searchCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { id } = req.params;
        const prop = yield index_1.AppDataSource.getRepository(categoria_1.Categoria).findOneBy({ id: +id });
        if (!prop) {
            return res.status(500).json({ message: "categoria no encontrado" });
        }
        return res.status(200).json({ result: prop });
    }
    catch (error) {
        throw res.status(500).json({ message: (_d = error.message) !== null && _d !== void 0 ? _d : error });
    }
});
exports.searchCategoria = searchCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prop = yield index_1.AppDataSource.getRepository(categoria_1.Categoria).findOneBy({ id: +id });
    if (!prop) {
        return res.status(500).json({ message: "categoria no encontrado" });
    }
    const resp = yield (0, categoria_2.deleteCategoriaInteractor)(prop);
    return res.json({ message: `Categoria con id ${id} eliminado` });
});
exports.deleteCategoria = deleteCategoria;
