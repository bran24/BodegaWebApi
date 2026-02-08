import { Router } from "express";
import validateToken from '../segurity/token'
import * as usController from "../controllers/RolPermisoController"
import checkPermission from "../segurity/checkPermission";
const router = Router()
router.post("/rolPermiso", validateToken, checkPermission('ROLES_VER'), usController.createRolPermisos


)


router.put("/rolPermiso", validateToken, checkPermission('ROLES_VER'), usController.updateRolPermisos


)

router.get("/rolPermiso", validateToken, checkPermission('ROLES_VER'), usController.listRolPermisos


)


router.get("/rolPermiso/:id", validateToken, checkPermission('ROLES_VER'), usController.searchPermisosPorRol


)

router.delete("/rolPermiso/:id", validateToken, checkPermission('ROLES_VER'), usController.deleteRolPermiso


)




export default router;