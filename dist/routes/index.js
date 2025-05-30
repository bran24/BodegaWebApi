"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Productos_route_1 = __importDefault(require("./Productos.route"));
exports.default = ({ app, version }) => {
    app.use(version, Productos_route_1.default);
};
