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
exports.Producto = void 0;
const typeorm_1 = require("typeorm");
const unidad_1 = require("./unidad");
const categoria_1 = require("./categoria");
const proveedor_1 = require("./proveedor");
const detalleVenta_1 = require("./detalleVenta");
const movimientoInventario_1 = require("./movimientoInventario");
let Producto = class Producto {
};
exports.Producto = Producto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Producto.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true, length: 20 }),
    __metadata("design:type", String)
], Producto.prototype, "codigoBarras", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Producto.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 6, scale: 3, default: 0 }),
    __metadata("design:type", Number)
], Producto.prototype, "precioCompra", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 6, scale: 3, default: 0 }),
    __metadata("design:type", Number)
], Producto.prototype, "precioVenta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unidad_1.Unidad, (uni) => uni.productos),
    (0, typeorm_1.JoinColumn)({ name: 'unidadid' }),
    __metadata("design:type", unidad_1.Unidad)
], Producto.prototype, "unidad", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proveedor_1.Proveedor, (prov) => prov.productos, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'proveedorid' }),
    __metadata("design:type", Object)
], Producto.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_1.Categoria, (categoria) => categoria.productos),
    (0, typeorm_1.JoinColumn)({ name: 'categoriaid' }),
    __metadata("design:type", categoria_1.Categoria)
], Producto.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producto.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Producto.prototype, "afecta_igv", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Producto.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Producto.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Producto.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Producto.prototype, "fecha_actualizacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detalleVenta_1.DetalleVenta, (dv) => dv.venta),
    __metadata("design:type", Array)
], Producto.prototype, "productoVentas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movimientoInventario_1.MovimientoInventario, (mov) => mov.producto),
    __metadata("design:type", Array)
], Producto.prototype, "movimientos", void 0);
exports.Producto = Producto = __decorate([
    (0, typeorm_1.Entity)({ name: 'producto' })
], Producto);
