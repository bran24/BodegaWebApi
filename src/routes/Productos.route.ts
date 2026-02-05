import { Router } from "express";
import validateToken from '../segurity/token'

import * as ProductodController from "../controllers/ProductoController"

const router = Router()
router.get("/productos", [validateToken],

    ProductodController.listProduct
)


router.post("/productos", [validateToken],

    ProductodController.createProduct
)

router.put("/productos", [validateToken],

    ProductodController.updateProduct
)



router.get("/productos/:id", [validateToken],

    ProductodController.searchProduct
)


router.delete("/productos/:id", [validateToken],

    ProductodController.deleteProduct
)


router.get('/productospag', [validateToken], ProductodController.getPaginatedProducts);




router.get('/productofiltro', [validateToken], ProductodController.buscarProductoFiltro);




export default router;