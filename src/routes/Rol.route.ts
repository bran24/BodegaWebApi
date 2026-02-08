import { Router } from "express";
import validateToken from '../segurity/token'
import * as usController from "../controllers/RolController"
import checkPermission from "../segurity/checkPermission";
const router = Router()
router.get("/rol", validateToken, checkPermission('ROLES_VER'), usController.listRoles


)


router.post("/rol", validateToken, checkPermission('ROLES_VER'), usController.createRoles


)

router.put("/rol", validateToken, checkPermission('ROLES_VER'), usController.updateRoles


)



router.get("/rol/:id", validateToken, checkPermission('ROLES_VER'), usController.searchRoles


)

router.delete("/rol/:id", validateToken, checkPermission('ROLES_VER'), usController.deleteRoles


)







export default router;