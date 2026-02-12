"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = __importDefault(require("../segurity/token"));
const ClienteController = __importStar(require("../controllers/ClienteController"));
const checkPermission_1 = __importDefault(require("../segurity/checkPermission"));
const router = (0, express_1.Router)();
router.get("/cliente", [token_1.default], (0, checkPermission_1.default)('CLIENTES_VER'), ClienteController.listCliente);
router.post("/cliente", [token_1.default], (0, checkPermission_1.default)('CLIENTES_CREAR'), ClienteController.createCliente);
router.put("/cliente", [token_1.default], (0, checkPermission_1.default)('CLIENTES_EDITAR'), ClienteController.updateCliente);
router.get("/tipodoc", [token_1.default], ClienteController.listTipoDoc);
router.get("/cliente/:id", [token_1.default], (0, checkPermission_1.default)('CLIENTES_VER'), ClienteController.searchCliente);
router.delete("/cliente/:id", [token_1.default], (0, checkPermission_1.default)('CLIENTES_ELIMINAR'), ClienteController.deleteCliente);
router.get('/clientepag', [token_1.default], (0, checkPermission_1.default)('CLIENTES_VER'), ClienteController.getPaginatedCliente);
router.get("/clientefiltro", [token_1.default], (0, checkPermission_1.default)('CLIENTES_VER'), ClienteController.BuscarClienteFiltro);
exports.default = router;
