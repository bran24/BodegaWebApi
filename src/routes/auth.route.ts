import { Router } from 'express'
import { Auth } from '../controllers/AuthController'

const router = Router()

router.post('/login', Auth);

export default router;