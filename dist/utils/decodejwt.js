"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const decode = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, config_1.SECRET_TOKEN, (error, decoded) => {
            if (error)
                reject({ message: 'No se pudo decodificar' });
            if (decoded)
                resolve(decoded);
            reject({ message: 'No decoded' });
        });
    });
};
exports.decode = decode;
const encode = (payload, duration = 32) => jsonwebtoken_1.default.sign(payload, config_1.SECRET_TOKEN, {
    expiresIn: `${config_1.TOKEN_LIMIT * duration}d`,
});
exports.encode = encode;
