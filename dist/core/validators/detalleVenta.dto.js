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
exports.DetalleVentaDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class DetalleVentaDto {
}
exports.DetalleVentaDto = DetalleVentaDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DetalleVentaDto.prototype, "productoid", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'La cantidad es obligatoria' }),
    (0, class_validator_1.IsNumber)({}, { message: 'La cantidad debe ser un número' }),
    (0, class_validator_1.IsPositive)({ message: 'La cantidad debe ser mayor que 0' }),
    __metadata("design:type", Number)
], DetalleVentaDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'El precio unitario es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El precio debe ser un número' }),
    (0, class_validator_1.IsPositive)({ message: 'El precio debe ser mayor que 0' }),
    __metadata("design:type", Number)
], DetalleVentaDto.prototype, "precio_unitario", void 0);
