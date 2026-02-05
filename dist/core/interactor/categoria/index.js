"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoriaInteractor = exports.updateCategoriaInteractor = exports.createCategoriaInteractor = void 0;
const categoria_interactor_1 = require("./categoria.interactor");
const categoria_datasource_1 = require("../../datasource/categoria.datasource");
const CategoriaRepository = new categoria_datasource_1.CategoriaTypeORM();
exports.createCategoriaInteractor = (0, categoria_interactor_1.createCategoria)(CategoriaRepository);
exports.updateCategoriaInteractor = (0, categoria_interactor_1.updateCategoria)(CategoriaRepository);
exports.deleteCategoriaInteractor = (0, categoria_interactor_1.deleteCategoria)(CategoriaRepository);
