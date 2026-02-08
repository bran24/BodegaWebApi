import { Router } from "express";
import validateToken from '../segurity/token'

import * as CategoriaController from "../controllers/CategoriaController"
import checkPermission  from "../segurity/checkPermission";

const router = Router()
router.get("/categoria", validateToken,

    CategoriaController.listCategoria
)


router.post("/categoria",validateToken,

    CategoriaController.createCategoria
)

router.put("/categoria",validateToken,

    CategoriaController.updateCategoria
)



router.get("/categoria/:id",validateToken,

    CategoriaController.searchCategoria
)

router.delete("/categoria/:id",validateToken,

    CategoriaController.deleteCategoria
)







export default router;