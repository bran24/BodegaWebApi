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
const ProveedorController = __importStar(require("../controllers/ProveedorController"));
const checkPermission_1 = __importDefault(require("../segurity/checkPermission"));
const router = (0, express_1.Router)();
router.get("/proveedor", [token_1.default], (0, checkPermission_1.default)("PROVEEDORES_VER"), ProveedorController.listProveedor);
router.post("/proveedor", [token_1.default], (0, checkPermission_1.default)("PROVEEDORES_CREAR"), ProveedorController.createProveedor);
router.put("/proveedor", [token_1.default], (0, checkPermission_1.default)("PROVEEDORES_EDITAR"), ProveedorController.updateProveedor);
router.get("/proveedor/:id", [token_1.default], (0, checkPermission_1.default)("PROVEEDORES_VER"), ProveedorController.searchProveedor);
router.delete("/proveedor/:id", [token_1.default], (0, checkPermission_1.default)("PROVEEDORES_ELIMINAR"), ProveedorController.deleteProveedor);
router.get('/proveedorpag', [token_1.default], (0, checkPermission_1.default)("PROVEEDORES_VER"), ProveedorController.getPaginatedProveedor);
exports.default = router;
