import { Router } from "express";
import validateToken from '../segurity/token'
import checkPermission  from "../segurity/checkPermission";

import * as ProductodController from "../controllers/ProductoController"

const router = Router()
router.get("/productos", validateToken,checkPermission("PRODUCTOS_VER"),

    ProductodController.listProduct
)


router.post("/productos", [validateToken],checkPermission("PRODUCTOS_CREAR"),

    ProductodController.createProduct
)

router.put("/productos", [validateToken],checkPermission("PRODUCTOS_EDITAR"),

    ProductodController.updateProduct
)



router.get("/productos/:id", [validateToken],checkPermission("PRODUCTOS_VER"),

    ProductodController.searchProduct
)


router.delete("/productos/:id", [validateToken],checkPermission("PRODUCTOS_ELIMINAR") ,

    ProductodController.deleteProduct
)


router.get('/productospag', [validateToken],checkPermission("PRODUCTOS_VER") ,ProductodController.getPaginatedProducts);




router.get('/productofiltro', [validateToken], checkPermission("PRODUCTOS_VER"),ProductodController.buscarProductoFiltro);




export default router;