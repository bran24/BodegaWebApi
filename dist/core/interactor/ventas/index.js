"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVentasInteractor = exports.createVentasInteractor = void 0;
const venta_interactor_1 = require("./venta.interactor");
const ventas_datasource_1 = require("../../datasource/ventas.datasource");
const productRepository = new ventas_datasource_1.VentasTypeOrm();
exports.createVentasInteractor = (0, venta_interactor_1.createVentas)(productRepository);
exports.deleteVentasInteractor = (0, venta_interactor_1.deleteVentas)(productRepository);
