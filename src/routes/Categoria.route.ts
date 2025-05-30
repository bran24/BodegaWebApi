import { Router } from "express";
import validateToken from '../segurity/token'

import * as CategoriaController from "../controllers/CategoriaController"

const router = Router()
router.get("/categoria", [validateToken],

    CategoriaController.listCategoria
)


router.post("/categoria",

    CategoriaController.createCategoria
)

router.put("/categoria",

    CategoriaController.updateCategoria
)



router.get("/categoria/:id",

    CategoriaController.searchCategoria
)

router.delete("/categoria/:id",

    CategoriaController.deleteCategoria
)







export default router;