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
exports.VentasTypeOrm = void 0;
const entities_1 = require("../entities");
const index_1 = require("../../index");
class VentasTypeOrm {
    createVentas(ventas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.AppDataSource.getRepository(entities_1.Ventas).save(ventas);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    deleteVentas(ventas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ventas.isActive = false;
                return yield index_1.AppDataSource.getRepository(entities_1.Ventas).save(ventas);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.VentasTypeOrm = VentasTypeOrm;
