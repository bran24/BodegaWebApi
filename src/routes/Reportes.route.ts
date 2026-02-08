import { Router } from "express";
import validateToken from '../segurity/token'
import checkPermission from "../segurity/checkPermission";

import * as ReportesController from "../controllers/ReportesController"

const router = Router()


router.get('/dashboard', [validateToken], checkPermission('DASHBOARD_VER'), ReportesController.getDashboardData);

router.get('/reporte/ingresos', [validateToken], checkPermission('REPORTES_VER'), ReportesController.getReporteIngresos);




export default router;