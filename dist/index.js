"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: config_1.DB_SERVER,
    username: config_1.DB_USERNAME,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_DATABASE,
    entities: ["dist/core/entities/**/*.js"],
    synchronize: true,
    logging: false,
});
(0, routes_1.default)({ app: app, version: "/api/v1/" });
app.get("*", (req, res) => {
    res.send("Page not found");
});
app.listen(config_1.PORT, () => {
    console.log(`Server iniciado en el puerto ${config_1.PORT}`, config_1.NODE_ENV);
});
AppDataSource.initialize();
