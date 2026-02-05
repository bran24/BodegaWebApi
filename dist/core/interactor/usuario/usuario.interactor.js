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
exports.findUsuario = exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = void 0;
const createUsuario = (usuarioRepository) => (usuario) => __awaiter(void 0, void 0, void 0, function* () { return usuarioRepository.createUsuario(usuario); });
exports.createUsuario = createUsuario;
const updateUsuario = (usuarioRepository) => (usuario) => __awaiter(void 0, void 0, void 0, function* () { return usuarioRepository.updateUsuario(usuario); });
exports.updateUsuario = updateUsuario;
const deleteUsuario = (usuarioRepository) => (usuario) => __awaiter(void 0, void 0, void 0, function* () { return usuarioRepository.deleteUsuario(usuario); });
exports.deleteUsuario = deleteUsuario;
const findUsuario = (usuarioRepository) => (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    usuarioRepository.findUsuario(usuario.id);
});
exports.findUsuario = findUsuario;
