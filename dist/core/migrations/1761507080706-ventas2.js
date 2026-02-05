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
exports.Ventas21761507080706 = void 0;
class Ventas21761507080706 {
    constructor() {
        this.name = 'Ventas21761507080706';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`movimiento_inventario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipo\` enum ('ENTRADA', 'SALIDA') NOT NULL, \`cantidad\` decimal(10,2) NOT NULL, \`referencia\` varchar(100) NULL, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_actualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productoid\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`movimiento_inventario\` DROP FOREIGN KEY \`FK_6e81316cda80c4a2ad71659e2b5\``);
            yield queryRunner.query(`DROP TABLE \`movimiento_inventario\``);
        });
    }
}
exports.Ventas21761507080706 = Ventas21761507080706;
