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
const checkPermission_1 = __importDefault(require("../segurity/checkPermission"));
const ProductodController = __importStar(require("../controllers/ProductoController"));
const router = (0, express_1.Router)();
router.get("/productos", token_1.default, (0, checkPermission_1.default)("PRODUCTOS_VER"), ProductodController.listProduct);
router.post("/productos", [token_1.default], (0, checkPermission_1.default)("PRODUCTOS_CREAR"), ProductodController.createProduct);
router.put("/productos", [token_1.default], (0, checkPermission_1.default)("PRODUCTOS_EDITAR"), ProductodController.updateProduct);
router.get("/productos/:id", [token_1.default], (0, checkPermission_1.default)("PRODUCTOS_VER"), ProductodController.searchProduct);
router.delete("/productos/:id", [token_1.default], (0, checkPermission_1.default)("PRODUCTOS_ELIMINAR"), ProductodController.deleteProduct);
router.get('/productospag', [token_1.default], (0, checkPermission_1.default)("PRODUCTOS_VER"), ProductodController.getPaginatedProducts);
router.get('/productofiltro', [token_1.default], (0, checkPermission_1.default)("PRODUCTOS_VER"), ProductodController.buscarProductoFiltro);
exports.default = router;
