import express, { Request, Response } from "express";
import Routes from "./routes"
import { DataSource } from "typeorm"
import * as entities from "./core/entities"
import cors from "cors";
import { control, trim } from "./middlewares/"

import {
    PORT,
    NODE_ENV,
    DB_DATABASE,
    DB_PASSWORD,
    DB_PORT,
    DB_SERVER,
    DB_USERNAME,
    // TABLEPREFIX,
} from "./config"
import helmet from "helmet";

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(control);
app.use(trim);
app.use('/upload', express.static("./upload"))

// app.set("trust proxy", true);

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_SERVER,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // options: {
    //     trustServerCertificate: true
    // },

    entities: [entities.Producto, entities.Permisos, entities.Roles, entities.Usuario, entities.Unidad, entities.Categoria, entities.RolPermiso, entities.TipoPermisos, entities.Proveedor],
    logging: false,


})



Routes({ app: app, version: "/api/v1/" })


app.get("*", (req: Request, res: Response) => {
    res.send("Page not found");
});


app.listen(PORT, () => {

    console.log(`Server iniciado en el puerto ${PORT}`, NODE_ENV)

})
AppDataSource.initialize()
    .then(() => {
        console.log("Base de Datos Iniciada")
    })
    .catch((err) => {
        console.error("error:", err)
    })