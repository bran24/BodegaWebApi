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
exports.RolPermiso = void 0;
const typeorm_1 = require("typeorm");
const roles_1 = require("./roles");
const permisos_1 = require("./permisos");
let RolPermiso = class RolPermiso {
};
exports.RolPermiso = RolPermiso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RolPermiso.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roles_1.Roles, (rol) => rol.rolPermisos),
    (0, typeorm_1.JoinColumn)({ name: 'rol_id' }),
    __metadata("design:type", roles_1.Roles)
], RolPermiso.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => permisos_1.Permisos, (permiso) => permiso.rolPermisos),
    (0, typeorm_1.JoinColumn)({ name: 'permiso_id' }),
    __metadata("design:type", permisos_1.Permisos)
], RolPermiso.prototype, "permiso", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RolPermiso.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RolPermiso.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RolPermiso.prototype, "fecha_actualizacion", void 0);
exports.RolPermiso = RolPermiso = __decorate([
    (0, typeorm_1.Entity)({ name: 'roles_permisos' })
], RolPermiso);
