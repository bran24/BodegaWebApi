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
exports.CategoriaTypeORM = void 0;
const index_1 = require("../../index");
const categoria_1 = require("../entities/categoria");
class CategoriaTypeORM {
    findCategoriaByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(categoria_1.Categoria).findOneBy({
                    id: id,
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createCategoria(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield yield index_1.AppDataSource.getRepository(categoria_1.Categoria).findOneBy({
                nombre: categoria.nombre, isActive: true
            }))
                throw 'Categoria ya registrado';
            return index_1.AppDataSource.getRepository(categoria_1.Categoria).save(categoria);
        });
    }
    updateCategoria(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findCategoriaByid = yield this.findCategoriaByid(categoria.id);
                if (findCategoriaByid == null) {
                    throw 'categoria no registrada';
                }
                return yield index_1.AppDataSource.getRepository(categoria_1.Categoria).save(categoria);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    deleteCategoria(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                categoria.isActive = false;
                return yield index_1.AppDataSource.getRepository(categoria_1.Categoria).save(categoria);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.CategoriaTypeORM = CategoriaTypeORM;
