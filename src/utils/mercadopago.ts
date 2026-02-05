import { MercadoPagoConfig } from 'mercadopago';
import { ACCESS_TOKEN_MERCADOPAGO } from '../config'
export const mpClient = new MercadoPagoConfig({ 
    accessToken:  ACCESS_TOKEN_MERCADOPAGO   || '' 
});