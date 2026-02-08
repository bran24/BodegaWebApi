import { Router } from "express";
import validateToken from "../segurity/token";
import * as ClienteController   from "../controllers/ClienteController"
import checkPermission  from "../segurity/checkPermission";
const router = Router()

router.get("/cliente",[validateToken],checkPermission('CLIENTES_VER'),ClienteController.listCliente)

router.post("/cliente",[validateToken],checkPermission('CLIENTES_CREAR'),ClienteController.createCliente)


router.put("/cliente",[validateToken],checkPermission('CLIENTES_EDITAR'),ClienteController.updateCliente)

router.get("/tipodoc",[validateToken],ClienteController.listTipoDoc)


router.get("/cliente/:id", [validateToken],checkPermission('CLIENTES_VER'),
  ClienteController.searchCliente
)


router.delete("/cliente/:id", [validateToken],checkPermission('CLIENTES_ELIMINAR'),

    ClienteController.deleteCliente)


router.get('/clientepag', [validateToken],checkPermission('CLIENTES_VER'),ClienteController.getPaginatedCliente);

router.get("/clientefiltro",[validateToken],checkPermission('CLIENTES_VER') ,ClienteController.BuscarClienteFiltro)

export default router