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
exports.Ventas = void 0;
const typeorm_1 = require("typeorm");
const clientes_1 = require("./clientes");
const user_1 = require("./user");
const detalleVenta_1 = require("./detalleVenta");
const pago_1 = require("./pago");
const tipoComprobante_1 = require("./tipoComprobante");
let Ventas = class Ventas {
};
exports.Ventas = Ventas;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ventas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clientes_1.Cliente, (cli) => cli.ventas, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'clienteid' }),
    __metadata("design:type", clientes_1.Cliente)
], Ventas.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.Usuario, (us) => us.ventas, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'usuarioid' }),
    __metadata("design:type", user_1.Usuario)
], Ventas.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Ventas.prototype, "fecha_venta", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], Ventas.prototype, "fecha_facturacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Ventas.prototype, "serie", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Ventas.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Ventas.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Ventas.prototype, "igv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Ventas.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], Ventas.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], Ventas.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Ventas.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipoComprobante_1.TipoComprobante, (tc) => tc.ventas, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'tipoComprobanteid' }),
    __metadata("design:type", tipoComprobante_1.TipoComprobante)
], Ventas.prototype, "tipo_comprobante", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detalleVenta_1.DetalleVenta, (dv) => dv.venta),
    __metadata("design:type", Array)
], Ventas.prototype, "detalleVentas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pago_1.Pago, (p) => p.venta),
    __metadata("design:type", Array)
], Ventas.prototype, "pagos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Ventas.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Ventas.prototype, "fecha_actualizacion", void 0);
exports.Ventas = Ventas = __decorate([
    (0, typeorm_1.Entity)({ name: 'ventas' })
], Ventas);
