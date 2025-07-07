
import { Response, Request } from 'express'

import { AppDataSource } from '../index'

import {Proveedor} from "../core/entities/proveedor"
import { createProveedorInteractor, deleteProveedorInteractor, updateProveedorInteractor } from '../core/interactor/proveedor';


export const createProveedor = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { nombre, descripcion,contacto,  email, telefono, direccion, pais } = req.body

  

       

        const prov = new Proveedor();
        prov.nombre = nombre;
        prov.descripcion= descripcion;
        prov.contacto = contacto;
        prov.email = email;
        prov.telefono= telefono;
        prov.direccion = direccion;
        prov.pais = pais;
        const result = await createProveedorInteractor(prov);


        return res.json({ result: result });
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }



}






export const listProveedor = async (req: Request, res: Response): Promise<Response> => {


    try {

        const prop = await AppDataSource.getRepository(Proveedor).find({
            where: {
                isActive: true,
            }

        })



        return res.json({ result: prop });

    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }


}



export const updateProveedor = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id,nombre, descripcion,contacto,  email, telefono, direccion, pais } = req.body


     



        const prov = new Proveedor()
        prov.id = id;
        prov.nombre = nombre;
        prov.descripcion = descripcion;
        prov.contacto = contacto;
        prov.email = email;
        prov.telefono= telefono;
        prov.direccion = direccion;
        prov.pais = pais;

        const result = await updateProveedorInteractor(prov);


        return res.json({ result: result });



    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }




}


export const searchProveedor = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id } = req.params

        const prov = await AppDataSource.getRepository(Proveedor).findOneBy({ id: +id })

        if (!prov) {
            return res.status(500).json({ message: "proveedor no encontrado" })
        }

        return res.status(200).json({ result: prov })



    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }

}
export const deleteProveedor = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const prov= await AppDataSource.getRepository(Proveedor).findOneBy({ id: +id })

    if (!prov) {
        return res.status(500).json({ message: "producto no encontrado" })
    }


    const resp = await deleteProveedorInteractor(prov)



    return res.json({ message: `Proveedor con id ${id} eliminado` });


}


export const getPaginatedProveedor = async (req: Request, res: Response) => {
    try {
        // Obtener los parámetros de la página y el límite desde la query string
        const page = parseInt(req.query.page as string) || 1;  // Página actual
        const limit = parseInt(req.query.limit as string) || 10;  // Elementos por página

        // Calcular cuántos elementos saltar (offset) basado en la página
        const offset = (page - 1) * limit;

        // Repositorio de productos
        const provRepository = AppDataSource.getRepository(Proveedor)

        // Obtener los productos con paginación
        const [proveedores, totalItems] = await provRepository.findAndCount({
            where: { isActive: true }, // Filtrar solo productos activos
            skip: offset,
            take: limit,
        });

        // Calcular el número total de páginas
        const totalPages = Math.ceil(totalItems / limit);

        // Respuesta al frontend con los datos paginados
        res.json({
            proveedores,
            totalItems,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error al obtener los proveedores paginados:', error);
        return res.status(500).json({ message: 'Error al obtener proveedores' });
    }
};