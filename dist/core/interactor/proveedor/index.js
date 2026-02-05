"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProveedorInteractor = exports.updateProveedorInteractor = exports.createProveedorInteractor = void 0;
const producto_interactor_1 = require("./producto.interactor");
const proveedor_datasource_1 = require("../../datasource/proveedor.datasource");
const productRepository = new proveedor_datasource_1.ProveedorTypeORM();
exports.createProveedorInteractor = (0, producto_interactor_1.createProveedor)(productRepository);
exports.updateProveedorInteractor = (0, producto_interactor_1.updateProveedor)(productRepository);
exports.deleteProveedorInteractor = (0, producto_interactor_1.deleteProveedor)(productRepository);
