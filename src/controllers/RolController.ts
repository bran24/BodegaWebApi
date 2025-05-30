
import { Response, Request } from 'express'
import { SECRET_TOKEN, TOKEN_LIMIT } from "../config";
import { AppDataSource } from '../index'
import jwt from "jsonwebtoken";
import { Roles } from "../core/entities"

import { createRolesInteractor, deleteRolesInteractor, findRolesInteractor, updateRolesInteractor } from '../core/interactor/roles';

import { encrypt } from "../utils/encrypt"
import bcrypt from "bcrypt";

export const createRoles = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { nombre, descripcion } = req.body as unknown as {
            nombre: string,
            descripcion: string
        };



        const rol = new Roles();
        rol.nombre = nombre
        rol.descripcion = descripcion

        const result = await createRolesInteractor(rol)




        return res.json({ result: result });
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }




}






export const listRoles = async (req: Request, res: Response): Promise<Response> => {


    try {

        const prop = await AppDataSource.getRepository(Roles).find({ where: { isActive: true } })



        return res.json({ result: prop });

    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }


}



export const updateRoles = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id, nombre, descripcion } = req.body

        const rol = await AppDataSource.getTreeRepository(Roles).findOneBy({ id: id, isActive: true })
        if (!rol) {
            return res.status(404).json({ message: "rol no existe" });
        }

        rol.nombre = nombre ?? rol.nombre
        rol.descripcion = descripcion

        const result = await updateRolesInteractor(rol)


        return res.json({ result: result });



    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }




}



export const searchRoles = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        //PASAR LAS CATEGPRIAS RELACIONADAS

        const id = + req.params.id
        const rol = await AppDataSource.getRepository(Roles).findOneBy({ id: id });
        if (!rol) {
            return res.status(404).json({ message: "No existe el rol" });
        }
        return res.status(200).json({ result: rol });
    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
};



export const deleteRoles = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {

        const roles = await AppDataSource.getRepository(Roles).findOne({
            where: { id: +req.params.id, isActive: true },
        });
        if (!roles) {
            return res.status(400).json({ message: "Rol no existe" });
        }
        const result = await deleteRolesInteractor(roles);
        return res.json({ result: result });
    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
};