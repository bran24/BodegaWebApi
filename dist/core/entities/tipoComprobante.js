"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoComprobante = void 0;
const typeorm_1 = require("typeorm");
const ventas_1 = require("./ventas");
let TipoComprobante = class TipoComprobante {
};
exports.TipoComprobante = TipoComprobante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TipoComprobante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TipoComprobante.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2 }),
    __metadata("design:type", String)
], TipoComprobante.prototype, "codigo_sunat", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 4 }),
    __metadata("design:type", String)
], TipoComprobante.prototype, "serie", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TipoComprobante.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ventas_1.Ventas, (venta) => venta.tipo_comprobante),
    __metadata("design:type", Array)
], TipoComprobante.prototype, "ventas", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], TipoComprobante.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TipoComprobante.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TipoComprobante.prototype, "fecha_actualizacion", void 0);
exports.TipoComprobante = TipoComprobante = __decorate([
    (0, typeorm_1.Entity)({ name: 'tipo_comprobante' })
], TipoComprobante);
