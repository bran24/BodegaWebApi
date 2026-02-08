
import { Router } from 'express'
import { chatWithIA } from '../controllers/ChatIAController'
import checkPermission  from "../segurity/checkPermission";
import validateToken from '../segurity/token'
const router = Router()

router.post('/chatia',validateToken,checkPermission('ASISTENTE_VER') ,chatWithIA);

export default router;