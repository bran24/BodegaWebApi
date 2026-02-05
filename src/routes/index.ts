import productos from "./Productos.route"
import usuarios from "./Usuario.route";
import auth from "./auth.route"
import roles from "./Rol.route"
import categoria from "./Categoria.route"
import unidad from "./Unidad.route"
import permiso from "./Permiso.route"
import rolPermiso from "./RolPermiso.route";
import proveedor from "./Proveedor.route"
import cliente from "./Cliente.route"
import ventas from "./Ventas.route"
import { Express } from "express"
import reportes from "./Reportes.route"
import chatIA from "./ChatIAController"


export default ({ app, version }: { app: Express; version: string }) => {
    app.use(version, auth)
    app.use(version, productos)
    app.use(version, usuarios)
    app.use(version, roles)
    app.use(version, categoria)
    app.use(version, unidad)
    app.use(version, permiso)
    app.use(version, rolPermiso)
    app.use(version, proveedor)
    app.use(version, cliente)
    app.use(version, ventas)
    app.use(version, reportes)
    app.use(version, chatIA)

};
