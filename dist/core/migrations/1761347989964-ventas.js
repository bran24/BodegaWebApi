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
exports.Ventas1761347989964 = void 0;
class Ventas1761347989964 {
    constructor() {
        this.name = 'Ventas1761347989964';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`metodo_pago\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`pago\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fecha\` datetime NOT NULL, \`monto\` decimal(10,2) NOT NULL DEFAULT '0.00', \`observacion\` varchar(30) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_actualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ventaid\` int NOT NULL, \`metodoPagoid\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`tipo_comprobante\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`codigo_sunat\` varchar(2) NOT NULL, \`serie\` varchar(4) NOT NULL, \`descripcion\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_actualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`ventas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fecha_venta\` datetime NOT NULL, \`serie\` varchar(10) NOT NULL, \`numero\` int NOT NULL, \`subtotal\` decimal(10,2) NOT NULL DEFAULT '0.00', \`igv\` decimal(10,2) NOT NULL DEFAULT '0.00', \`total\` decimal(10,2) NOT NULL DEFAULT '0.00', \`estado\` varchar(15) NOT NULL, \`observacion\` varchar(30) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_actualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`clienteid\` int NOT NULL, \`usuarioid\` int NOT NULL, \`tipoComprobanteid\` int NULL, \`metodoPagoid\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`detalle_venta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`precio_unitario\` decimal(10,2) NOT NULL DEFAULT '0.00', \`cantidad\` int NOT NULL, \`subtotal\` decimal(10,2) NOT NULL DEFAULT '0.00', \`afecta_igv\` tinyint NOT NULL, \`igv\` decimal(10,2) NOT NULL DEFAULT '0.00', \`total\` decimal(10,2) NOT NULL DEFAULT '0.00', \`isActive\` tinyint NOT NULL DEFAULT 1, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_actualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ventaid\` int NOT NULL, \`productoid\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`pago\` ADD CONSTRAINT \`FK_8cdfed1eaf1086b0fbc3803391b\` FOREIGN KEY (\`ventaid\`) REFERENCES \`ventas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`pago\` ADD CONSTRAINT \`FK_e75580f4ffd5e125e571e2ea932\` FOREIGN KEY (\`metodoPagoid\`) REFERENCES \`metodo_pago\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`ventas\` ADD CONSTRAINT \`FK_c599489188de651be67c6808339\` FOREIGN KEY (\`clienteid\`) REFERENCES \`cliente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`ventas\` ADD CONSTRAINT \`FK_89c2b3729b87d8a90344df5d66b\` FOREIGN KEY (\`usuarioid\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`ventas\` ADD CONSTRAINT \`FK_788127ef87b7586cff0fb414eb2\` FOREIGN KEY (\`tipoComprobanteid\`) REFERENCES \`tipo_comprobante\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`ventas\` ADD CONSTRAINT \`FK_145738946c19be7b04b0f353d44\` FOREIGN KEY (\`metodoPagoid\`) REFERENCES \`metodo_pago\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`detalle_venta\` ADD CONSTRAINT \`FK_8969b6d0b66052369be2126215b\` FOREIGN KEY (\`ventaid\`) REFERENCES \`ventas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`detalle_venta\` ADD CONSTRAINT \`FK_b4e8c463b77b04221ef0387914f\` FOREIGN KEY (\`productoid\`) REFERENCES \`producto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`detalle_venta\` DROP FOREIGN KEY \`FK_b4e8c463b77b04221ef0387914f\``);
            yield queryRunner.query(`ALTER TABLE \`detalle_venta\` DROP FOREIGN KEY \`FK_8969b6d0b66052369be2126215b\``);
            yield queryRunner.query(`ALTER TABLE \`ventas\` DROP FOREIGN KEY \`FK_145738946c19be7b04b0f353d44\``);
            yield queryRunner.query(`ALTER TABLE \`ventas\` DROP FOREIGN KEY \`FK_788127ef87b7586cff0fb414eb2\``);
            yield queryRunner.query(`ALTER TABLE \`ventas\` DROP FOREIGN KEY \`FK_89c2b3729b87d8a90344df5d66b\``);
            yield queryRunner.query(`ALTER TABLE \`ventas\` DROP FOREIGN KEY \`FK_c599489188de651be67c6808339\``);
            yield queryRunner.query(`ALTER TABLE \`pago\` DROP FOREIGN KEY \`FK_e75580f4ffd5e125e571e2ea932\``);
            yield queryRunner.query(`ALTER TABLE \`pago\` DROP FOREIGN KEY \`FK_8cdfed1eaf1086b0fbc3803391b\``);
            yield queryRunner.query(`DROP TABLE \`detalle_venta\``);
            yield queryRunner.query(`DROP TABLE \`ventas\``);
            yield queryRunner.query(`DROP TABLE \`tipo_comprobante\``);
            yield queryRunner.query(`DROP TABLE \`pago\``);
            yield queryRunner.query(`DROP TABLE \`metodo_pago\``);
            yield queryRunner.query(`ALTER TABLE \`producto\` ADD CONSTRAINT \`fk_producto_proveedor\` FOREIGN KEY (\`proveedorid\`) REFERENCES \`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        });
    }
}
exports.Ventas1761347989964 = Ventas1761347989964;
