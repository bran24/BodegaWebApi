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
exports.RolesTypeOrm = void 0;
const entities_1 = require("../entities");
const index_1 = require("../../index");
const console_1 = require("console");
class RolesTypeOrm {
    findRolesByUuid(Rolesname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Roles).findOneBy({
                    nombre: Rolesname,
                    isActive: true
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createRoles(roles) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.findRolesByUuid(roles.nombre))
                    throw 'Rol ya registrado';
                return yield index_1.AppDataSource.getRepository(entities_1.Roles).save(roles);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    updateRoles(roles) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield this.findRoles(roles.id))) {
                    throw 'Roles no registrado';
                }
                return yield index_1.AppDataSource.getRepository(entities_1.Roles).save(roles);
            }
            catch (Error) {
                throw new Error(console_1.error);
            }
        });
    }
    deleteRoles(roles) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                roles.isActive = false;
                return yield index_1.AppDataSource.getRepository(entities_1.Roles).save(roles);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    findRoles(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Roles).findOneBy({
                    id: id
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.RolesTypeOrm = RolesTypeOrm;
