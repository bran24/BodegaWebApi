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
exports.UsuarioTypeOrm = void 0;
const entities_1 = require("../entities");
const index_1 = require("../../index");
const encrypt_1 = require("../../utils/encrypt");
const console_1 = require("console");
class UsuarioTypeOrm {
    findUserByUuid(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Usuario).findOne({
                    where: { username: username, isActive: true },
                    relations: ['rol'],
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.findUserByUuid(usuario.username))
                    throw 'Usuario ya registrado';
                usuario.password = yield (0, encrypt_1.encrypt)(usuario.password);
                return yield index_1.AppDataSource.getRepository(entities_1.Usuario).save(usuario);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    updateUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Usuario).save(usuario);
            }
            catch (Error) {
                throw new Error(console_1.error);
            }
        });
    }
    deleteUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                usuario.isActive = false;
                return yield index_1.AppDataSource.getRepository(entities_1.Usuario).save(usuario);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    findUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Usuario).findOneBy({
                    id: id
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.UsuarioTypeOrm = UsuarioTypeOrm;
