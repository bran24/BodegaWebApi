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
exports.deleteRolPermiso = exports.searchPermisosPorRol = exports.updateRolPermisos = exports.listRolPermisos = exports.createRolPermisos = void 0;
const index_1 = require("../index");
const entities_1 = require("../core/entities");
const typeorm_1 = require("typeorm");
const roles_1 = require("./../core/interactor/roles/");
const createRolPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const queryRunner = index_1.AppDataSource.createQueryRunner();
    try {
        const { rolId, permisosId } = req.body;
        yield queryRunner.startTransaction();
        const rol = yield queryRunner.manager.findOne(entities_1.Roles, { where: { id: rolId } });
        if (!rol) {
            throw new Error('Rol no existe');
        }
        const permisos = yield queryRunner.manager.find(entities_1.Permisos, {
            where: { id: (0, typeorm_1.In)(permisosId) }
        });
        if (permisos.length !== permisosId.length) {
            const missingIds = permisosId.filter(id => !permisos.find(p => p.id === id));
            throw new Error(`Permiso(s) con id(s) ${missingIds.join(', ')} no existe(n)`);
        }
        const rolPermisos = permisos.map(permiso => {
            const rolPermiso = new entities_1.RolPermiso();
            rolPermiso.rol = rol;
            rolPermiso.permiso = permiso;
            return rolPermiso;
        });
        yield queryRunner.manager.save(entities_1.RolPermiso, rolPermisos);
        yield queryRunner.commitTransaction();
        return res.json({ result: "Rol y permisos registrados con éxito" });
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        return res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createRolPermisos = createRolPermisos;
const listRolPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const prop = yield index_1.AppDataSource.getRepository(entities_1.RolPermiso).findBy({ isActive: true });
        return res.json({ result: prop });
    }
    catch (error) {
        return res.status(500).json({ message: (_b = error.message) !== null && _b !== void 0 ? _b : error });
    }
});
exports.listRolPermisos = listRolPermisos;
const updateRolPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const queryRunner = index_1.AppDataSource.createQueryRunner();
    try {
        const { rolId, permisosId } = req.body;
        yield queryRunner.startTransaction();
        const rol = yield queryRunner.manager.findOne(entities_1.Roles, { where: { id: rolId } });
        if (!rol) {
            throw new Error('Rol no existe');
        }
        const rolPermisosExistentes = yield queryRunner.manager.find(entities_1.RolPermiso, {
            where: { rol: { id: rolId }, isActive: true },
            relations: ['permiso']
        });
        const permisosActualesIds = rolPermisosExistentes.map(rp => rp.permiso.id);
        for (const rolPermiso of rolPermisosExistentes) {
            if (!permisosId.includes(rolPermiso.permiso.id)) {
                rolPermiso.isActive = false;
                yield queryRunner.manager.save(entities_1.RolPermiso, rolPermiso);
            }
        }
        const permisos = yield queryRunner.manager.find(entities_1.Permisos, {
            where: { id: (0, typeorm_1.In)(permisosId) }
        });
        if (permisos.length !== permisosId.length) {
            const missingIds = permisosId.filter(id => !permisos.find(p => p.id === id));
            throw new Error(`Permiso(s) con id(s) ${missingIds.join(', ')} no existe(n)`);
        }
        for (const permiso of permisos) {
            const existingRelation = rolPermisosExistentes.find(rp => rp.permiso.id === permiso.id);
            if (existingRelation) {
                if (!existingRelation.isActive) {
                    existingRelation.isActive = true;
                    yield queryRunner.manager.save(entities_1.RolPermiso, existingRelation);
                }
            }
            else {
                const newRolPermiso = new entities_1.RolPermiso();
                newRolPermiso.rol = rol;
                newRolPermiso.permiso = permiso;
                newRolPermiso.isActive = true;
                yield queryRunner.manager.save(entities_1.RolPermiso, newRolPermiso);
            }
        }
        yield queryRunner.commitTransaction();
        return res.json({ result: "Permisos del rol actualizados con éxito" });
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        return res.status(500).json({ message: (_c = error.message) !== null && _c !== void 0 ? _c : error });
    }
    finally {
        yield queryRunner.release();
    }
});
exports.updateRolPermisos = updateRolPermisos;
const searchPermisosPorRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const rolId = +req.params.id;
        const rolPermisos = yield index_1.AppDataSource.getRepository(entities_1.RolPermiso)
            .createQueryBuilder('rolPermiso')
            .leftJoinAndSelect('rolPermiso.rol', 'rol')
            .leftJoinAndSelect('rolPermiso.permiso', 'permiso')
            .select(['rolPermiso.id', 'permiso.id'])
            .where('rol.id = :rolId', { rolId })
            .andWhere('rolPermiso.isActive = :isActive', { isActive: true })
            .getMany();
        return res.status(200).json({ result: rolPermisos });
    }
    catch (error) {
        return res.status(500).json({ message: (_d = error.message) !== null && _d !== void 0 ? _d : error });
    }
});
exports.searchPermisosPorRol = searchPermisosPorRol;
const deleteRolPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const queryRunner = index_1.AppDataSource.createQueryRunner();
    try {
        const rolId = +req.params.id;
        const roles = yield index_1.AppDataSource.getRepository(entities_1.Roles).findOne({
            where: { id: rolId, isActive: true },
        });
        if (!roles) {
            return res.status(400).json({ message: "El rol no existe." });
        }
        const usuarios = yield index_1.AppDataSource.getRepository(entities_1.Usuario).find({
            where: { rol: { id: rolId }, isActive: true },
            relations: ['rol']
        });
        console.log(roles);
        console.log(usuarios);
        if (usuarios.length > 0) {
            return res.status(400).json({ message: "No se puede eliminar el rol, ya que hay usuarios activos asociados." });
        }
        yield queryRunner.startTransaction();
        const rolPermisosExistentes = yield queryRunner.manager.find(entities_1.RolPermiso, {
            where: { rol: { id: rolId }, isActive: true },
        });
        for (const rolPermiso of rolPermisosExistentes) {
            rolPermiso.isActive = false;
            yield queryRunner.manager.save(entities_1.RolPermiso, rolPermiso);
        }
        yield (0, roles_1.deleteRolesInteractor)(roles);
        yield queryRunner.commitTransaction();
        return res.status(200).json({ result: "Rol eliminado con éxito" });
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        return res.status(500).json({ message: (_e = error.message) !== null && _e !== void 0 ? _e : error });
    }
    finally {
        yield queryRunner.release();
    }
});
exports.deleteRolPermiso = deleteRolPermiso;
