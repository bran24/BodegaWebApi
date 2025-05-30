import { Router } from "express";
import validateToken from '../segurity/token'
import * as usController from "../controllers/RolController"

const router = Router()
router.get("/rol", validateToken, usController.listRoles


)


router.post("/rol", validateToken, usController.createRoles


)

router.put("/rol", validateToken, usController.updateRoles


)



router.get("/rol/:id", validateToken, usController.searchRoles


)

router.delete("/rol/:id", validateToken, usController.deleteRoles


)







export default router;