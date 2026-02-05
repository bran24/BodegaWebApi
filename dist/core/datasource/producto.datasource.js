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
exports.ProductoTypeORM = void 0;
const index_1 = require("../../index");
const producto_1 = require("../entities/producto");
class ProductoTypeORM {
    findProductByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(producto_1.Producto).findOneBy({
                    id: id,
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield index_1.AppDataSource.getRepository(producto_1.Producto).findOneBy({ nombre: producto.nombre, isActive: true }))
                throw 'Producto ya registrado';
            return index_1.AppDataSource.getRepository(producto_1.Producto).save(producto);
        });
    }
    updateProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findProductByid = yield this.findProductByid(producto.id);
                if (findProductByid == null) {
                    throw 'Producto no registrado';
                }
                return yield index_1.AppDataSource.getRepository(producto_1.Producto).save(producto);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    deleteProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                producto.isActive = false;
                return yield index_1.AppDataSource.getRepository(producto_1.Producto).save(producto);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.ProductoTypeORM = ProductoTypeORM;
