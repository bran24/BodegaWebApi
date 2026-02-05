"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnidadInteractor = exports.updateUnidadInteractor = exports.createUnidadInteractor = void 0;
const unidad_interactor_1 = require("./unidad.interactor");
const unidad_datasource_1 = require("../../datasource/unidad.datasource");
const UnidadRepository = new unidad_datasource_1.UnidadTypeORM();
exports.createUnidadInteractor = (0, unidad_interactor_1.createUnidad)(UnidadRepository);
exports.updateUnidadInteractor = (0, unidad_interactor_1.updateUnidad)(UnidadRepository);
exports.deleteUnidadInteractor = (0, unidad_interactor_1.deleteUnidad)(UnidadRepository);
