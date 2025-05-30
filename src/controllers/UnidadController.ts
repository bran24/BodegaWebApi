
import { Response, Request } from 'express'

import { AppDataSource } from '../index'

import { Unidad } from "../core/entities/unidad"
import { createUnidadInteractor, deleteUnidadInteractor, updateUnidadInteractor } from '../core/interactor/unidad';
export const createUnidad = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { nombre } = req.body


        const existeUnidad = await AppDataSource.getRepository(Unidad).findOneBy({ nombre: nombre, isActive: true })

        if (!existeUnidad) {
            return res.status(400).json({ message: "Unidad ya existe" })

        }


        const cat = new Unidad();
        cat.nombre = nombre;
        const result = await createUnidadInteractor(cat);


        return res.json({ result: result });
    }
    catch (error: any) {
        throw res.status(500).json({ message: error.message ?? error })
    }



}






export const listUnidad = async (req: Request, res: Response): Promise<Response> => {


    try {

        const prop = await AppDataSource.getRepository(Unidad).find({
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



export const updateUnidad = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id, nombre, } = req.body




        const existeUnidad = await AppDataSource.getRepository(Unidad).findOneBy({ id: id })

        if (!existeUnidad) {
            return res.status(400).json({ message: "Unidad no encontrada" })

        }


        const cat = new Unidad()
        cat.id = id;
        cat.nombre = nombre;

        const result = await updateUnidadInteractor(cat);

        return res.json({ result: result });



    }
    catch (error: any) {
        throw res.status(500).json({ message: error.message ?? error })
    }




}


export const searchUnidad = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id } = req.params

        const prop = await AppDataSource.getRepository(Unidad).findOneBy({ id: +id })

        if (!prop) {
            return res.status(500).json({ message: "unidad no encontrado" })
        }

        return res.status(200).json({ result: prop })



    }
    catch (error: any) {
        throw res.status(500).json({ message: error.message ?? error })
    }

}
export const deleteUnidad = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const prop = await AppDataSource.getRepository(Unidad).findOneBy({ id: +id })

    if (!prop) {
        return res.status(500).json({ message: "unidad no encontrado" })
    }


    const resp = await deleteUnidadInteractor(prop)



    return res.json({ message: `Unidad con id ${id} eliminado` });


}
