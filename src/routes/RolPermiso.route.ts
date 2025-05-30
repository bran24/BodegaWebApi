import { Router } from "express";
import validateToken from '../segurity/token'
import * as usController from "../controllers/RolPermisoController"

const router = Router()
router.post("/rolPermiso", validateToken, usController.createRolPermisos


)


router.put("/rolPermiso", validateToken, usController.updateRolPermisos


)

router.get("/rolPermiso", validateToken, usController.listRolPermisos


)


router.get("/rolPermiso/:id", validateToken, usController.searchPermisosPorRol


)

router.delete("/rolPermiso/:id", validateToken, usController.deleteRolPermiso


)




export default router;