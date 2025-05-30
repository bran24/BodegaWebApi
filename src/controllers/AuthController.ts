import { AppDataSource } from '../index'
import { Permisos, RolPermiso, Usuario } from "../core/entities/"
import { encrypt, checkPassword } from "../utils/encrypt"
import { SECRET_TOKEN, TOKEN_LIMIT } from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { promises } from 'dns';

export const Auth = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body as { username: string; password: string };
        if (!username && !password) {
            return res.status(400).json({ message: "Enviar todos los parámetros" });
        }

        if (password !== password?.trim())
            return res.status(400).json({
                message: "La contraseña no debe tener espacios al inicio y final",
            });



        const login = await AppDataSource.getRepository(Usuario).findOne({
            where: { username: username },
            relations: ['rol'],
        });

        if (!login) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }


        const isPassword = await checkPassword(password, login.password)

        if (!isPassword) {
            return res.status(401).json({ message: "password incorrecto" })
        }

        const permisos = []

        const rolper = await AppDataSource.getRepository(RolPermiso).find({
            where: { rol: { id: login.rol.id }, isActive: true },
            relations: ['rol', 'permiso'],

        })

        for (var per of rolper) {
            permisos.push(per.permiso.id)


        }

        console.log(permisos)


        const token = jwt.sign(
            {

                id: login.id,

            },
            SECRET_TOKEN,
            {
                expiresIn: `${Number(TOKEN_LIMIT) * 32}d`,
            }

        )

        return res.json({
            "id": login.id,
            "username": login.username,
            "email": login.email,
            "rol": { id: login.rol.id, nombre: login.rol.nombre },
            "permisos": permisos,
            "token": token
        })

    }


    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }





}



