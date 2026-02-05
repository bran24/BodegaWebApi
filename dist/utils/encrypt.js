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
exports.checkPasswordSync = exports.encryptSync = exports.checkPassword = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const encrypt = (password) => __awaiter(void 0, void 0, void 0, function* () { return yield bcrypt_1.default.hash(password, config_1.SALT); });
exports.encrypt = encrypt;
const checkPassword = (password, encrypted) => __awaiter(void 0, void 0, void 0, function* () { return yield bcrypt_1.default.compare(password, encrypted); });
exports.checkPassword = checkPassword;
const encryptSync = (password) => bcrypt_1.default.hashSync(password, config_1.SALT);
exports.encryptSync = encryptSync;
const checkPasswordSync = (password, encrypted) => bcrypt_1.default.compareSync(password, encrypted);
exports.checkPasswordSync = checkPasswordSync;
