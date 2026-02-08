import { Router } from "express";
import validateToken from '../segurity/token'
import * as Permisos from "../controllers/PermisosController"
import checkPermission from "../segurity/checkPermission";
const router = Router()
router.get("/permiso", validateToken, checkPermission('VER_PERMISOS'), Permisos.listPermisos


)


router.post("/permiso", validateToken, checkPermission('VER_PERMISOS'), Permisos.createPermisos


)

router.put("/permiso", validateToken, checkPermission('VER_PERMISOS'), Permisos.updatePermisos


)



router.get("/permiso/:id", validateToken, checkPermission('VER_PERMISOS'), Permisos.searchPermisos


)

router.delete("/permiso/:id", validateToken, checkPermission('VER_PERMISOS'), Permisos.deletePermisos


)







export default router;