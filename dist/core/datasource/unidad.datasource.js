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
exports.UnidadTypeORM = void 0;
const index_1 = require("../../index");
const unidad_1 = require("../entities/unidad");
class UnidadTypeORM {
    findUnidadByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(unidad_1.Unidad).findOneBy({
                    id: id,
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createUnidad(unidad) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield index_1.AppDataSource.getRepository(unidad_1.Unidad).findOneBy({
                nombre: unidad.nombre, isActive: true
            }))
                throw 'Unidad ya registrado';
            return index_1.AppDataSource.getRepository(unidad_1.Unidad).save(unidad);
        });
    }
    updateUnidad(unidad) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findUnidadByid = yield this.findUnidadByid(unidad.id);
                if (findUnidadByid == null) {
                    throw 'unidad no registrada';
                }
                return yield index_1.AppDataSource.getRepository(unidad_1.Unidad).save(unidad);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    deleteUnidad(unidad) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                unidad.isActive = false;
                return yield index_1.AppDataSource.getRepository(unidad_1.Unidad).save(unidad);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.UnidadTypeORM = UnidadTypeORM;
