
import { Response, Request } from 'express'

import { AppDataSource } from '../index'

import { Producto } from "../core/entities/producto"
import { createProductInteractor, deleteProductInteractor, updateProductInteractor } from '../core/interactor/producto';
import { Categoria } from '../core/entities/categoria';
import { Unidad } from '../core/entities/unidad';
import { Proveedor } from '../core/entities/proveedor';
export const createProduct = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { nombre, precioVenta, precioCompra, cantidad, fechaVencimiento, unidad, categoria, proveedor, afecta_igv, codigoBarras, descripcion } = req.body

        const existeUnidad = await AppDataSource.getRepository(Unidad).findOneBy({ id: unidad })

        if (!existeUnidad) {
            return res.status(400).json({ message: "Unidad no encontrada" })

        }

        const existeCategoria = await AppDataSource.getRepository(Categoria).findOneBy({ id: categoria })

        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria no encontrada" })

        }

        const existeProveedor = await AppDataSource.getRepository(Proveedor).findOneBy({ id: proveedor })

        const productoRepo = AppDataSource.getRepository(Producto);
        const ultimoProducto = await productoRepo
            .createQueryBuilder("producto")
            .orderBy("producto.id", "DESC")
            .getOne();
        const siguienteNumero = (ultimoProducto?.id || 0) + 1;
        const sku = `PROD-${String(siguienteNumero).padStart(6, '0')}`;

        const prod = new Producto();
        prod.nombre = nombre;
        prod.precioVenta = precioVenta;
        prod.precioCompra = precioCompra;
        prod.afecta_igv = afecta_igv;
        prod.categoria = existeCategoria;
        prod.unidad = existeUnidad;
        prod.cantidad = cantidad;
        prod.codigoBarras = codigoBarras || null;
        prod.descripcion = descripcion;
        prod.fechaVencimiento = fechaVencimiento;
        prod.sku = sku;
        prod.proveedor = existeProveedor ?? null;




        const result = await createProductInteractor(prod);


        return res.json({ result: result });
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }



}






export const listProduct = async (req: Request, res: Response): Promise<Response> => {


    try {

        const prop = await AppDataSource.getRepository(Producto).find({
            where: {
                isActive: true,
            },
            relations: ['categoria', 'unidad', 'proveedor']

        })



        return res.json({ result: prop });

    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }


}



export const updateProduct = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id, nombre, precioVenta, precioCompra, cantidad, fechaVencimiento, unidad, categoria, proveedor, afecta_igv, descripcion } = req.body


        const existeUnidad = await AppDataSource.getRepository(Unidad).findOneBy({ id: unidad })

        if (!existeUnidad) {
            return res.status(400).json({ message: "Unidad no encontrada" })

        }

        const existeCategoria = await AppDataSource.getRepository(Categoria).findOneBy({ id: categoria })

        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria no encontrada" })

        }

        const existeProveedor = await AppDataSource.getRepository(Proveedor).findOneBy({ id: proveedor })



        const prod = new Producto()
        prod.id = id;
        prod.nombre = nombre;
        prod.precioVenta = precioVenta;
        prod.precioCompra = precioCompra;
        prod.categoria = existeCategoria;
        prod.unidad = existeUnidad;
        prod.afecta_igv = afecta_igv;
        prod.cantidad = cantidad;
        prod.fechaVencimiento = fechaVencimiento;
        prod.proveedor = existeProveedor ?? null;
        prod.descripcion = descripcion;

        const result = await updateProductInteractor(prod);

        return res.json({ result: result });



    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }




}


export const searchProduct = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id } = req.params

        const prop = await AppDataSource.getRepository(Producto).findOneBy({ id: +id })

        if (!prop) {
            return res.status(500).json({ message: "producto no encontrado" })
        }

        return res.status(200).json({ result: prop })



    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }

}
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const prop = await AppDataSource.getRepository(Producto).findOneBy({ id: +id })

    if (!prop) {
        return res.status(500).json({ message: "producto no encontrado" })
    }


    const resp = await deleteProductInteractor(prop)



    return res.json({ message: `Producto con id ${id} eliminado` });


};


export const getPaginatedProducts = async (req: Request, res: Response) => {
    try {
        // Obtener los parámetros de la página y el límite desde la query string
        const page = parseInt(req.query.page as string) || 1;  // Página actual
        const limit = parseInt(req.query.limit as string) || 10;  // Elementos por página
        const query = req.query.query as string;
        const categoria = req.query.categoria as string;
        const proveedor = req.query.proveedor as string;
        const fechaVencimiento = req.query.fechaVencimiento as string;
        const all = req.query.all || "false";
        const ordenStock = req.query.ordenStock as string;



        // Calcular cuántos elementos saltar (offset) basado en la página
        const offset = (page - 1) * limit;

        // Repositorio de productos
        const productRepository = AppDataSource.getRepository(Producto)

        const qb = productRepository.createQueryBuilder("p")
            .where("p.isActive = :isActive", { isActive: true })

        qb.leftJoinAndSelect("p.categoria", "c")
            .leftJoinAndSelect("p.unidad", "u")
            .leftJoinAndSelect("p.proveedor", "prov")


        if (query && query !== "undefined") {
            qb.andWhere("p.nombre LIKE :query OR p.sku LIKE :query", { query: `%${query}%` })
        }

        if (categoria && categoria !== "undefined") {
            qb.andWhere("c.id = :categoria", { categoria })
        }

        if (proveedor && proveedor !== "undefined") {
            qb.andWhere("prov.id = :proveedor", { proveedor })
        }







        qb.select([
            "p.id",
            "p.nombre",
            "p.sku",
            "p.precioVenta",
            "p.precioCompra",
            "p.cantidad",
            "p.descripcion",
            "p.afecta_igv",
            "p.fechaVencimiento",
            "c.id",
            "c.nombre",
            "u.id",
            "u.nombre",
            "prov.id",
            "prov.nombre"
        ])

        if (fechaVencimiento && fechaVencimiento !== "undefined") {
            qb.andWhere("p.fechaVencimiento >= :fechaVencimiento", { fechaVencimiento })
            qb.orderBy("p.fechaVencimiento", "ASC")
        }
        else {
            qb.orderBy("p.id", "ASC")
        }


        if (ordenStock && ordenStock !== "undefined") {

            if (ordenStock === "ASC") {
                qb.orderBy("p.cantidad", "ASC")
            }
            else if (ordenStock === "DESC") {
                qb.orderBy("p.cantidad", "DESC")
            }
        }


        if (all != "true") {
            qb.skip(offset)
                .take(limit)
        }


        const [productos, totalItems] = await qb.getManyAndCount();



        // Calcular el número total de páginas
        const totalPages = Math.ceil(totalItems / limit);


        res.json({
            productos,
            totalItems,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error al obtener los productos paginados:', error);
        return res.status(500).json({ message: 'Error al obtener productos' });
    }
};





export const buscarProductoFiltro = async (req: Request, res: Response) => {
    try {

        const { query, categoria } = req.query as { query?: string, categoria?: string };
        const queryBuilder = AppDataSource.getRepository(Producto)
            .createQueryBuilder("d")
            .where("d.isActive = true")






        if (query) {
            queryBuilder.andWhere("(d.nombre LIKE :q OR d.sku like :q)", { q: `%${query}%` })
        }


        if (categoria && categoria != '') {
            queryBuilder.andWhere("d.categoria = :categoria", { categoria })
        }

        const productos = await queryBuilder
            .leftJoinAndSelect("d.categoria", "c")
            .leftJoinAndSelect("d.proveedor", "p")
            .select(["d.id", "d.nombre", "d.sku", "d.precioVenta", "d.cantidad", "d.afecta_igv", "d.fechaVencimiento",
                "c.id", "c.nombre", "p.id", "p.nombre"

            ])
            .orderBy("d.id", "ASC")
            .limit(20)
            .getMany();






        return res.json({ result: productos })




    }
    catch (error) {
        console.error('Error al buscar clientes', error)
        return res.status(500).json({ message: 'Error al buscar cliente por filtro' })

    }



};