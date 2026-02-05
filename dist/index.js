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
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const typeorm_1 = require("typeorm");
const entities = __importStar(require("./core/entities"));
const cors_1 = __importDefault(require("cors"));
const middlewares_1 = require("./middlewares/");
require("reflect-metadata");
const config_1 = require("./config");
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(middlewares_1.control);
app.use(middlewares_1.trim);
app.use('/upload', express_1.default.static("./upload"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: config_1.DB_SERVER,
    port: config_1.DB_PORT,
    username: config_1.DB_USERNAME,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_DATABASE,
    migrations: [__dirname + "/core/migrations/*.{ts,js}"],
    entities: [entities.TipoDocumento, entities.Cliente, entities.Producto, entities.Permisos, entities.Roles, entities.Usuario, entities.Unidad, entities.Categoria, entities.RolPermiso, entities.TipoPermisos, entities.Proveedor, entities.MetodoPago, entities.TipoComprobante, entities.Ventas, entities.DetalleVenta, entities.Pago, entities.MovimientoInventario],
    logging: false,
});
(0, routes_1.default)({ app: app, version: "/api/v1/" });
app.get("*", (req, res) => {
    res.send("Page not found");
});
app.listen(config_1.PORT, () => {
    console.log(`Server iniciado en el puerto ${config_1.PORT}`, config_1.NODE_ENV);
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Base de Datos Iniciada");
})
    .catch((err) => {
    console.error("error:", err);
});
