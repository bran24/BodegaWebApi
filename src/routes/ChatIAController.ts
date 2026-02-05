
import { Router } from 'express'
import { chatWithIA } from '../controllers/ChatIAController'

const router = Router()

router.post('/chatia', chatWithIA);

export default router;