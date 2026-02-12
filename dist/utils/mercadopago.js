"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mpClient = void 0;
const mercadopago_1 = require("mercadopago");
const config_1 = require("../config");
exports.mpClient = new mercadopago_1.MercadoPagoConfig({
    accessToken: config_1.ACCESS_TOKEN_MERCADOPAGO || ''
});
