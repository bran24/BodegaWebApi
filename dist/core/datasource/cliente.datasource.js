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
exports.ClienteTypeOrm = void 0;
const entities_1 = require("../entities");
const index_1 = require("../../index");
const console_1 = require("console");
class ClienteTypeOrm {
    findClienteByUuid(numero_documento) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Cliente).findOne({
                    where: { numero_documento: numero_documento, isActive: true }
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createCliente(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Cliente).save(cliente);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    updateCliente(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Cliente).save(cliente);
            }
            catch (Error) {
                throw new Error(console_1.error);
            }
        });
    }
    deleteCliente(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                cliente.isActive = false;
                return yield index_1.AppDataSource.getRepository(entities_1.Cliente).save(cliente);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    findCliente(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Cliente).findOneBy({
                    id: id
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.ClienteTypeOrm = ClienteTypeOrm;
