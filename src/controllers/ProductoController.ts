
import { Response, Request } from 'express'

import { AppDataSource } from '../index'

import { Producto } from "../core/entities/producto"
import { createProductInteractor, deleteProductInteractor, updateProductInteractor } from '../core/interactor/producto';
import { Categoria } from '../core/entities/categoria';
import { Unidad } from '../core/entities/unidad';
export const createProduct = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { nombre, precioVenta, precioCompra, cantidad, fechaVencimiento, unidad, categoria } = req.body

        const existeUnidad = await AppDataSource.getRepository(Unidad).findOneBy({ id: unidad })

        if (!existeUnidad) {
            return res.status(400).json({ message: "Unidad no encontrada" })

        }

        const existeCategoria = await AppDataSource.getRepository(Categoria).findOneBy({ id: categoria })

        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria no encontrada" })

        }


        const prod = new Producto();
        prod.nombre = nombre;
        prod.precioVenta = precioVenta;
        prod.precioCompra = precioCompra;
        prod.categoria = existeCategoria;
        prod.unidad = existeUnidad;
        prod.cantidad = cantidad;
        prod.fechaVencimiento = fechaVencimiento;
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
            relations: ['categoria', 'unidad']

        })



        return res.json({ result: prop });

    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }


}



export const updateProduct = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id, nombre, precioVenta, precioCompra, cantidad, fechaVencimiento, unidad, categoria } = req.body


        const existeUnidad = await AppDataSource.getRepository(Unidad).findOneBy({ id: unidad })

        if (!existeUnidad) {
            return res.status(400).json({ message: "Unidad no encontrada" })

        }

        const existeCategoria = await AppDataSource.getRepository(Categoria).findOneBy({ id: categoria })

        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria no encontrada" })

        }



        const prod = new Producto()
        prod.id = id;
        prod.nombre = nombre;
        prod.precioVenta = precioVenta;
        prod.precioCompra = precioCompra;
        prod.categoria = existeCategoria;
        prod.unidad = existeUnidad;
        prod.cantidad = cantidad;
        prod.fechaVencimiento = fechaVencimiento;

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


}


export const getPaginatedProducts = async (req: Request, res: Response) => {
    try {
        // Obtener los parámetros de la página y el límite desde la query string
        const page = parseInt(req.query.page as string) || 1;  // Página actual
        const limit = parseInt(req.query.limit as string) || 10;  // Elementos por página

        // Calcular cuántos elementos saltar (offset) basado en la página
        const offset = (page - 1) * limit;

        // Repositorio de productos
        const productRepository = AppDataSource.getRepository(Producto)

        // Obtener los productos con paginación
        const [productos, totalItems] = await productRepository.findAndCount({
            where: { isActive: true }, // Filtrar solo productos activos
            relations: ['categoria', 'unidad'], // Incluir relaciones
            skip: offset,
            take: limit,
        });

        // Calcular el número total de páginas
        const totalPages = Math.ceil(totalItems / limit);

        // Respuesta al frontend con los datos paginados
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