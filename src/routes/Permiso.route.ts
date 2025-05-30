import { Router } from "express";
import validateToken from '../segurity/token'
import * as Permisos from "../controllers/PermisosController"

const router = Router()
router.get("/permiso", validateToken, Permisos.listPermisos


)


router.post("/permiso", validateToken, Permisos.createPermisos


)

router.put("/permiso", validateToken, Permisos.updatePermisos


)



router.get("/permiso/:id", validateToken, Permisos.searchPermisos


)

router.delete("/permiso/:id", validateToken, Permisos.deletePermisos


)







export default router;