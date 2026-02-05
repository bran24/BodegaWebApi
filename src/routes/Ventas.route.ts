import { Router } from "express";
import validateToken from '../segurity/token'

import * as VentasController from "../controllers/VentasController"

const router = Router()


router.get('/ventaspag', [validateToken], VentasController.getPagFiltroVentas);


router.post("/venta", [validateToken],

    VentasController.createVentas
)

router.post("/cambiarEstadoVenta", [validateToken],

    VentasController.cambiarEstadoVenta
)



router.get("/venta/:id", [validateToken],

    VentasController.getVentaById
)



router.get('/metodopagos', [validateToken], VentasController.listmetodopago);

router.get('/tipocomprobantes', [validateToken], VentasController.listcomprobante);

router.post("/webhook", [validateToken],VentasController.mercadoPagoWebhook );



export default router;