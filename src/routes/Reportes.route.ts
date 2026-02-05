import { Router } from "express";
import validateToken from '../segurity/token'


import * as ReportesController from "../controllers/ReportesController"

const router = Router()


router.get('/dashboard', [validateToken], ReportesController.getDashboardData);

router.get('/reporte/ingresos', [validateToken], ReportesController.getReporteIngresos);




export default router;