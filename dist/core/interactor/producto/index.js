"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductInteractor = exports.updateProductInteractor = exports.createProductInteractor = void 0;
const producto_interactor_1 = require("./producto.interactor");
const producto_datasource_1 = require("../../datasource/producto.datasource");
const productRepository = new producto_datasource_1.ProductoTypeORM();
exports.createProductInteractor = (0, producto_interactor_1.createProducto)(productRepository);
exports.updateProductInteractor = (0, producto_interactor_1.updateProducto)(productRepository);
exports.deleteProductInteractor = (0, producto_interactor_1.deleteProducto)(productRepository);
