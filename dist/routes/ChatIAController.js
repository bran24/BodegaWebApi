"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatIAController_1 = require("../controllers/ChatIAController");
const checkPermission_1 = __importDefault(require("../segurity/checkPermission"));
const token_1 = __importDefault(require("../segurity/token"));
const router = (0, express_1.Router)();
router.post('/chatia', token_1.default, (0, checkPermission_1.default)('ASISTENTE_VER'), ChatIAController_1.chatWithIA);
exports.default = router;
