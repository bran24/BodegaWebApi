import { Router } from "express";
import validateToken from '../segurity/token'

import * as UnidadController from "../controllers/UnidadController"

const router = Router()
router.get("/unidad", [validateToken],

    UnidadController.listUnidad
)


router.post("/unidad",

    UnidadController.createUnidad
)

router.put("/unidad",

    UnidadController.updateUnidad
)



router.get("/unidad/:id",

    UnidadController.searchUnidad
)

router.delete("/unidad/:id",

    UnidadController.deleteUnidad
)







export default router;