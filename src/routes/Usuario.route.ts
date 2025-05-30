import { Router } from "express";

import * as usController from "../controllers/UsuarioController"

const router = Router()
// router.get("/usuario", usController.listUser


// )


router.get("/usuario", usController.getPaginatedUser


)


router.post("/usuario", usController.createUser


)

router.put("/usuario", usController.updateUser


)



router.get("/usuario/:id", usController.searchUser


)

router.delete("/usuario/:id", usController.deleteUser


)







export default router;