import { Router } from "express";
import validateToken from "../segurity/token";
import * as ProveedorController   from "../controllers/ProveedorController"

const router = Router()

router.get("/proveedor",[validateToken],ProveedorController.listProveedor)

router.post("/proveedor",[validateToken],ProveedorController.createProveedor)


router.put("/proveedor",[validateToken],ProveedorController.updateProveedor)


router.get("/proveedor/:id", [validateToken],
  ProveedorController.searchProveedor
)


router.delete("/proveedor/:id", [validateToken],

    ProveedorController.deleteProveedor)


router.get('/proveedorpag', [validateToken], ProveedorController.getPaginatedProveedor);

export default router