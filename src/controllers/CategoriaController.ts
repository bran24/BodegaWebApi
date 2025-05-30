
import { Response, Request } from 'express'

import { AppDataSource } from '../index'

import { Categoria } from "../core/entities/categoria"
import { createCategoriaInteractor, deleteCategoriaInteractor, updateCategoriaInteractor } from '../core/interactor/categoria';
export const createCategoria = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { nombre } = req.body


        const existeCategoria = await AppDataSource.getRepository(Categoria).findOneBy({ nombre: nombre })

        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria ya existe" })

        }


        const cat = new Categoria();
        cat.nombre = nombre;
        const result = await createCategoriaInteractor(cat);


        return res.json({ result: result });
    }
    catch (error: any) {
        throw res.status(500).json({ message: error.message ?? error })
    }



}






export const listCategoria = async (req: Request, res: Response): Promise<Response> => {


    try {

        const prop = await AppDataSource.getRepository(Categoria).find({
            where: {
                isActive: true,
            },


        })



        return res.json({ result: prop });

    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }


}



export const updateCategoria = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id, nombre, } = req.body




        const existeCategoria = await AppDataSource.getRepository(Categoria).findOneBy({ id: id })

        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria no encontrada" })

        }


        const cat = new Categoria()
        cat.id = id;
        cat.nombre = nombre;

        const result = await updateCategoriaInteractor(cat);

        return res.json({ result: result });



    }
    catch (error: any) {
        throw res.status(500).json({ message: error.message ?? error })
    }




}


export const searchCategoria = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id } = req.params

        const prop = await AppDataSource.getRepository(Categoria).findOneBy({ id: +id })

        if (!prop) {
            return res.status(500).json({ message: "categoria no encontrado" })
        }

        return res.status(200).json({ result: prop })



    }
    catch (error: any) {
        throw res.status(500).json({ message: error.message ?? error })
    }

}
export const deleteCategoria = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const prop = await AppDataSource.getRepository(Categoria).findOneBy({ id: +id })

    if (!prop) {
        return res.status(500).json({ message: "categoria no encontrado" })
    }


    const resp = await deleteCategoriaInteractor(prop)



    return res.json({ message: `Categoria con id ${id} eliminado` });


}
