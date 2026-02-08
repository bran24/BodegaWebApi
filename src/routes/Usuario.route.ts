import { Router } from "express";
import validateToken from '../segurity/token'
import * as usController from "../controllers/UsuarioController"
import checkPermission from "../segurity/checkPermission";
const router = Router()
// router.get("/usuario", usController.listUser


// )


router.get("/usuario", validateToken, checkPermission('USUARIOS_VER'), usController.getPaginatedUser


)


router.post("/usuario", validateToken, checkPermission('USUARIOS_CREAR'), usController.createUser


)

router.put("/usuario", validateToken, checkPermission('USUARIOS_EDITAR'), usController.updateUser


)



router.get("/usuario/:id", validateToken, checkPermission('USUARIOS_VER'), usController.searchUser


)

router.delete("/usuario/:id", validateToken, checkPermission('USUARIOS_ELIMINAR'), usController.deleteUser


)







export default router;