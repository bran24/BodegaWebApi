import { Router } from "express";
import validateToken from "../segurity/token";
import * as ProveedorController   from "../controllers/ProveedorController"
import checkPermission  from "../segurity/checkPermission";

const router = Router()

router.get("/proveedor",[validateToken] , checkPermission("PROVEEDORES_VER") ,ProveedorController.listProveedor)

router.post("/proveedor",[validateToken], checkPermission("PROVEEDORES_CREAR"),ProveedorController.createProveedor)


router.put("/proveedor",[validateToken],checkPermission("PROVEEDORES_EDITAR"),ProveedorController.updateProveedor)


router.get("/proveedor/:id", [validateToken],checkPermission("PROVEEDORES_VER"),
  ProveedorController.searchProveedor
)


router.delete("/proveedor/:id" ,  [validateToken],checkPermission("PROVEEDORES_ELIMINAR"),

    ProveedorController.deleteProveedor)


router.get('/proveedorpag', [validateToken], checkPermission("PROVEEDORES_ver")  ,ProveedorController.getPaginatedProveedor);

export default router