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
exports.Auth = void 0;
const index_1 = require("../index");
const entities_1 = require("../core/entities/");
const encrypt_1 = require("../utils/encrypt");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, password } = req.body;
        if (!username && !password) {
            return res.status(400).json({ message: "Enviar todos los parámetros" });
        }
        if (password !== (password === null || password === void 0 ? void 0 : password.trim()))
            return res.status(400).json({
                message: "La contraseña no debe tener espacios al inicio y final",
            });
        const login = yield index_1.AppDataSource.getRepository(entities_1.Usuario).findOne({
            where: { username: username },
            relations: ['rol'],
        });
        if (!login) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
        const isPassword = yield (0, encrypt_1.checkPassword)(password, login.password);
        if (!isPassword) {
            return res.status(401).json({ message: "password incorrecto" });
        }
        const permisos = [];
        const rolper = yield index_1.AppDataSource.getRepository(entities_1.RolPermiso).find({
            where: { rol: { id: login.rol.id }, isActive: true },
            relations: ['rol', 'permiso'],
        });
        for (var per of rolper) {
            permisos.push(per.permiso.id);
        }
        console.log(permisos);
        const token = jsonwebtoken_1.default.sign({
            id: login.id,
        }, config_1.SECRET_TOKEN, {
            expiresIn: `${Number(config_1.TOKEN_LIMIT) * 32}d`,
        });
        return res.json({
            "id": login.id,
            "username": login.username,
            "email": login.email,
            "rol": { id: login.rol.id, nombre: login.rol.nombre },
            "permisos": permisos,
            "token": token
        });
    }
    catch (error) {
        return res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
});
exports.Auth = Auth;
