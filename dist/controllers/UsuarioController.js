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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedUser = exports.deleteUser = exports.searchUser = exports.updateUser = exports.createUser = void 0;
const config_1 = require("../config");
const index_1 = require("../index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const entities_1 = require("../core/entities/");
const usuario_1 = require("../core/interactor/usuario");
const roles_1 = require("../core/interactor/roles");
const encrypt_1 = require("../utils/encrypt");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password, username, rol } = req.body;
        const roles = yield (0, roles_1.findRolesInteractor)(rol);
        if (!roles) {
            return res.status(400).json({ message: "Rol no encontrado" });
        }
        const us = new entities_1.Usuario();
        us.username = username;
        us.email = email;
        us.password = password;
        us.rol = roles;
        const result = yield (0, usuario_1.createUsuarioInteractor)(us);
        const token = jsonwebtoken_1.default.sign({
            id: us.id,
        }, config_1.SECRET_TOKEN, {
            expiresIn: `${Number(config_1.TOKEN_LIMIT) * 32}d`,
        });
        return res.json({
            result: {
                id: result.id,
                username: result.username,
                email: result.email,
                rol: result.rol
            },
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { id, username, email, password, rol } = req.body;
        console.log("0", req.body);
        const roles = yield (0, roles_1.findRolesInteractor)(+rol);
        if (!roles) {
            throw new Error('Rol no encontrado');
        }
        const us = yield index_1.AppDataSource.getRepository(entities_1.Usuario).findOneBy({ id });
        console.log("1", us);
        console.log(us);
        if (!us) {
            return res.status(404).json({ message: "Usuario no existe" });
        }
        if (password && us.password !== password) {
            us.password = yield (0, encrypt_1.encrypt)(password);
        }
        us.username = username !== null && username !== void 0 ? username : us.username;
        us.email = email !== null && email !== void 0 ? email : us.email;
        us.rol = roles !== null && roles !== void 0 ? roles : us.rol;
        const result = yield (0, usuario_1.updateUsuarioInteractor)(us);
        return res.status(200).json({ result: `Usuario con id ${result.id} actualizado` });
    }
    catch (error) {
        return res.status(500).json({ message: (_b = error.message) !== null && _b !== void 0 ? _b : error });
    }
});
exports.updateUser = updateUser;
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const id = +req.params.id;
        const usuario = yield index_1.AppDataSource.getRepository(entities_1.Usuario).findOneBy({ id: id });
        if (!usuario) {
            return res.status(404).json({ message: "No existe el usuario" });
        }
        return res.status(200).json({ result: usuario });
    }
    catch (error) {
        return res.status(500).json({ message: (_c = error.message) !== null && _c !== void 0 ? _c : error });
    }
});
exports.searchUser = searchUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const user = yield index_1.AppDataSource.getRepository(entities_1.Usuario).findOne({
            where: { id: +req.params.id, isActive: true },
        });
        if (!user) {
            return res.status(400).json({ message: "Usuario no existe" });
        }
        const result = yield (0, usuario_1.deleteUsuarioInteractor)(user);
        return res.json({
            result: {
                id: result.id,
                username: result.username,
                email: result.email,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ message: (_d = error.message) !== null && _d !== void 0 ? _d : error });
    }
});
exports.deleteUser = deleteUser;
const getPaginatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const query = req.query.query;
        const all = req.query.all || "false";
        const offset = (page - 1) * limit;
        console.log(query);
        const usuarioRepository = index_1.AppDataSource.getRepository(entities_1.Usuario);
        const qb = usuarioRepository.createQueryBuilder("u")
            .where("u.isActive = :isActive", { isActive: true });
        if (query && query !== "undefined") {
            qb.andWhere("u.username LIKE :query", { query: `%${query}%` });
        }
        qb.leftJoinAndSelect("u.rol", "rol");
        qb.select(['u.id', 'u.username', 'u.email', 'rol.id', 'rol.nombre', 'u.password']);
        if (all === "true") {
            qb.orderBy("u.id", "ASC");
        }
        else {
            qb.orderBy("u.id", "ASC")
                .skip(offset)
                .take(limit);
        }
        const [usuarios, totalItems] = yield qb.getManyAndCount();
        const totalPages = Math.ceil(totalItems / limit);
        res.json({
            usuarios,
            totalItems,
            totalPages,
            currentPage: page,
        });
    }
    catch (error) {
        console.error('Error al obtener los Usuarios paginados:', error);
        return res.status(500).json({ message: 'Error al obtener Usuarios' });
    }
});
exports.getPaginatedUser = getPaginatedUser;
