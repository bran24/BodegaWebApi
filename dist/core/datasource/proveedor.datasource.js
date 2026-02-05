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
exports.ProveedorTypeORM = void 0;
const index_1 = require("../../index");
const proveedor_1 = require("../entities/proveedor");
class ProveedorTypeORM {
    findProvByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(proveedor_1.Proveedor).findOneBy({
                    id: id,
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createProveedor(proveedor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield index_1.AppDataSource.getRepository(proveedor_1.Proveedor).findOneBy({ nombre: proveedor.nombre, isActive: true }))
                throw 'Proveedor ya registrado';
            return index_1.AppDataSource.getRepository(proveedor_1.Proveedor).save(proveedor);
        });
    }
    updateProveedor(proveedor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findProdvByid = yield this.findProvByid(proveedor.id);
                if (findProdvByid == null) {
                    throw 'Proveedor no registrado';
                }
                return yield index_1.AppDataSource.getRepository(proveedor_1.Proveedor).save(proveedor);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    deleteProveedor(proveedor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                proveedor.isActive = false;
                return yield index_1.AppDataSource.getRepository(proveedor_1.Proveedor).save(proveedor);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.ProveedorTypeORM = ProveedorTypeORM;
