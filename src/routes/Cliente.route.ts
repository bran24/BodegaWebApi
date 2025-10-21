import { Router } from "express";
import validateToken from "../segurity/token";
import * as ClienteController   from "../controllers/ClienteController"

const router = Router()

router.get("/cliente",[validateToken],ClienteController.listCliente)

router.post("/cliente",[validateToken],ClienteController.createCliente)


router.put("/cliente",[validateToken],ClienteController.updateCliente)

router.get("/tipodoc",[validateToken],ClienteController.listTipoDoc)


router.get("/cliente/:id", [validateToken],
  ClienteController.searchCliente
)


router.delete("/cliente/:id", [validateToken],

    ClienteController.deleteCliente)


router.get('/clientepag', [validateToken], ClienteController.getPaginatedCliente);

export default router