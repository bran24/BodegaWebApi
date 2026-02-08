import { Router } from "express";
import validateToken from '../segurity/token'
import checkPermission from "../segurity/checkPermission";
import * as UnidadController from "../controllers/UnidadController"

const router = Router()
router.get("/unidad", [validateToken], checkPermission('PRODUCTOS_VER'),

    UnidadController.listUnidad
)


router.post("/unidad", [validateToken], checkPermission('PRODUCTOS_VER'),

    UnidadController.createUnidad
)

router.put("/unidad", [validateToken], checkPermission('PRODUCTOS_VER'),

    UnidadController.updateUnidad
)



router.get("/unidad/:id", [validateToken], checkPermission('PRODUCTOS_VER'),

    UnidadController.searchUnidad
)

router.delete("/unidad/:id", [validateToken], checkPermission('PRODUCTOS_VER'),

    UnidadController.deleteUnidad
)







export default router;