import { Router } from "express";
import validateToken from '../segurity/token'
import checkPermission from "../segurity/checkPermission";
import * as VentasController from "../controllers/VentasController"

const router = Router()


router.get('/ventaspag', [validateToken], checkPermission('VENTAS_VER'), VentasController.getPagFiltroVentas);


router.post("/venta", [validateToken], checkPermission('VENTAS_CREAR'),

    VentasController.createVentas
)

router.post("/cambiarEstadoVenta", [validateToken], checkPermission('VENTAS_EDITAR'),

    VentasController.cambiarEstadoVenta
)



router.get("/venta/:id", [validateToken], checkPermission('VENTAS_VER'),

    VentasController.getVentaById
)



router.get('/metodopagos', [validateToken], checkPermission('VENTAS_CREAR'), VentasController.listmetodopago);

router.get('/tipocomprobantes', [validateToken], checkPermission('VENTAS_CREAR'), VentasController.listcomprobante);

router.post("/webhook", [validateToken], checkPermission('VENTAS_CREAR'), VentasController.mercadoPagoWebhook);



export default router;