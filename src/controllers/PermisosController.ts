
import { Response, Request } from 'express'
import { SECRET_TOKEN, TOKEN_LIMIT } from "../config";
import { AppDataSource } from '../index'
import jwt from "jsonwebtoken";
import { Permisos, TipoPermisos } from "../core/entities"

import { createPermisosInteractor, deletePermisosInteractor, findPermisosInteractor, updatePermisosInteractor } from '../core/interactor/permisos';

import { encrypt } from "../utils/encrypt"
import bcrypt from "bcrypt";

export const createPermisos = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { nombre, descripcion } = req.body as unknown as {
            nombre: string
            descripcion: string
        };

        const permisos = await AppDataSource.getRepository(Permisos).findOne({
            where: { nombre: nombre, isActive: true }
        });


        if (permisos) {
            throw new Error('Permiso ya existe');
        }


        const permiso = new Permisos();
        permiso.nombre = nombre
        permiso.descripcion = descripcion

        const result = await createPermisosInteractor(permiso)




        return res.json({ result: result });
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }




}



export const listPermisos = async (req: Request, res: Response): Promise<Response> => {




    try {


        const prop = await AppDataSource.getRepository(TipoPermisos)
            .createQueryBuilder('tipoPermisos')
            .leftJoinAndSelect('tipoPermisos.permisos', 'permisos')
            .select(['tipoPermisos.id', 'tipoPermisos.nombre', 'tipoPermisos.descripcion', 'permisos.id', 'permisos.nombre', 'permisos.descripcion'])
            .where('tipoPermisos.isActive = :isActive', { isActive: true })
            .andWhere('permisos.isActive = :permisoActivo', { permisoActivo: true })
            .getMany();




        return res.json({ result: prop });

    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }


}






// export const listPermisos = async (req: Request, res: Response): Promise<Response> => {


//     try {

//         const prop = await AppDataSource.getRepository(Permisos).findBy({ isActive: true })



//         return res.json({ result: prop });

//     }
//     catch (error: any) {
//         return res.status(500).json({ message: error.message ?? error })
//     }


// }



export const updatePermisos = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { nombre, descripcion, id } = req.body


        const permiso = await AppDataSource.getTreeRepository(Permisos).findOneBy({ id: id, isActive: true })

        if (!permiso) {
            return res.status(404).json({ message: "permiso no existe" });
        }

        permiso.nombre = nombre ?? permiso.nombre
        permiso.descripcion = descripcion ?? permiso.descripcion
        const result = await updatePermisosInteractor(permiso)


        return res.json({ result: result });



    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }




}



export const searchPermisos = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        //PASAR LAS CATEGPRIAS RELACIONADAS

        const id = + req.params.id
        const permiso = await AppDataSource.getRepository(Permisos).findOneBy({ id: id });
        if (!permiso) {
            return res.status(404).json({ message: "No existe el permiso" });
        }
        return res.status(200).json({ result: permiso });
    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
};



export const deletePermisos = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {

        const permisos = await AppDataSource.getRepository(Permisos).findOne({
            where: { id: +req.params.id, isActive: true },
        });
        if (!permisos) {
            return res.status(400).json({ message: "Permiso no existe" });
        }
        const result = await deletePermisosInteractor(permisos);
        return res.json({ result: result });
    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
};