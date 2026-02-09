import { Router } from "express";
import validateToken from '../segurity/token'
import * as Permisos from "../controllers/PermisosController"
import checkPermission from "../segurity/checkPermission";
const router = Router()
router.get("/permiso", validateToken, checkPermission('PERMISOS_VER'), Permisos.listPermisos


)


router.post("/permiso", validateToken, checkPermission('PERMISOS_VER'), Permisos.createPermisos


)

router.put("/permiso", validateToken, checkPermission('PERMISOS_VER'), Permisos.updatePermisos


)



router.get("/permiso/:id", validateToken, checkPermission('PERMISOS_VER'), Permisos.searchPermisos


)

router.delete("/permiso/:id", validateToken, checkPermission('PERMISOS_VER'), Permisos.deletePermisos


)







export default router;