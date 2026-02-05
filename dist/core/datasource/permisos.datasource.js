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
exports.PermisosTypeOrm = void 0;
const entities_1 = require("../entities");
const index_1 = require("../../index");
const console_1 = require("console");
class PermisosTypeOrm {
    findPermisosByUuid(Permisosname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Permisos).findOneBy({
                    nombre: Permisosname,
                    isActive: true
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createPermisos(permisos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.findPermisosByUuid(permisos.nombre))
                    throw 'Rol ya registrado';
                return yield index_1.AppDataSource.getRepository(entities_1.Permisos).save(permisos);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    updatePermisos(permisos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield this.findPermisos(permisos.id))) {
                    throw 'Permiso no registrado';
                }
                return yield index_1.AppDataSource.getRepository(entities_1.Permisos).save(permisos);
            }
            catch (Error) {
                throw new Error(console_1.error);
            }
        });
    }
    deletePermisos(permisos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                permisos.isActive = false;
                return yield index_1.AppDataSource.getRepository(entities_1.Permisos).save(permisos);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    findPermisos(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Permisos).findOneBy({
                    id: id
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.PermisosTypeOrm = PermisosTypeOrm;
