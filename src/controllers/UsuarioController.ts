
import { Response, Request } from 'express'
import { SECRET_TOKEN, TOKEN_LIMIT } from "../config";
import { AppDataSource } from '../index'
import jwt from "jsonwebtoken";
import { Usuario, Roles } from "../core/entities/"
import { createUsuarioInteractor, deleteUsuarioInteractor, findUsuarioInteractor, updateUsuarioInteractor } from '../core/interactor/usuario';

import { createRolesInteractor, deleteRolesInteractor, findRolesInteractor, updateRolesInteractor } from '../core/interactor/roles';

import { encrypt } from "../utils/encrypt"


export const createUser = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { email, password, username, rol } = req.body as unknown as {
            email: string, password: string, username: string, rol: number

        };


        const roles = await findRolesInteractor(rol);
        if (!roles) {

            return res.status(400).json({ message: "Rol no encontrado" })
        }


        const us = new Usuario();
        us.username = username
        us.email = email
        us.password = password
        us.rol = roles

        const result = await createUsuarioInteractor(us);





        const token = jwt.sign(
            {
                // hasPivileges: us.rol === 1 ? true : false,
                id: us.id,
            },
            SECRET_TOKEN,
            {
                expiresIn: `${Number(TOKEN_LIMIT) * 32}d`,
            }

        )



        return res.json({
            result: {
                id: result.id,
                username: result.username,
                email: result.email,
                rol: result.rol
            },
            token: token
        });
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }




}






// export const listUser = async (req: Request, res: Response): Promise<Response> => {


//     try {

//         const prop = await AppDataSource.getRepository(Usuario).findBy({ isActive: true })

//         console.log(prop)

//         return res.json({ result: prop });

//     }
//     catch (error: any) {
//         return res.status(500).json({ message: error.message ?? error })
//     }


// }



export const updateUser = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id, username, email, password, rol } = req.body

        console.log("0", req.body)


        const roles = await findRolesInteractor(+rol);
        if (!roles) {
            throw new Error('Rol no encontrado');
        }


        const us = await AppDataSource.getRepository(Usuario).findOneBy({ id })

        console.log("1", us)
        console.log(us)
        if (!us) {
            return res.status(404).json({ message: "Usuario no existe" });
        }

        if (password && us.password !== password) {
            us.password = await encrypt(password);
        }


        us.username = username ?? us.username;
        us.email = email ?? us.email;

        us.rol = roles ?? us.rol;
        const result = await updateUsuarioInteractor(us);


        return res.status(200).json({ result: `Usuario con id ${result.id} actualizado` });



    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }




}



export const searchUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        //PASAR LAS CATEGPRIAS RELACIONADAS

        const id = + req.params.id
        const usuario = await AppDataSource.getRepository(Usuario).findOneBy({ id: id });
        if (!usuario) {
            return res.status(404).json({ message: "No existe el usuario" });
        }
        return res.status(200).json({ result: usuario });
    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
};



export const deleteUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {

        const user = await AppDataSource.getRepository(Usuario).findOne({
            where: { id: +req.params.id, isActive: true },
        });
        if (!user) {
            return res.status(400).json({ message: "Usuario no existe" });
        }
        const result = await deleteUsuarioInteractor(user);
        return res.json({
            result: {
                id: result.id,
                username: result.username,
                email: result.email,
            },
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
};



export const getPaginatedUser = async (req: Request, res: Response) => {
    try {
        // Obtener los parámetros de la página y el límite desde la query string
        const page = parseInt(req.query.page as string) || 1;  // Página actual
        const limit = parseInt(req.query.limit as string) || 10;  // Elementos por página
        const query = req.query.query as string;
        const all = req.query.all || "false";
        // Calcular cuántos elementos saltar (offset) basado en la página
        const offset = (page - 1) * limit;

        console.log(query)
        // Repositorio de productos
        const usuarioRepository = AppDataSource.getRepository(Usuario)

        const qb = usuarioRepository.createQueryBuilder("u")
            .where("u.isActive = :isActive", { isActive: true })

        if (query && query !== "undefined") {
            qb.andWhere("u.username LIKE :query", { query: `%${query}%` })
        }
        qb.leftJoinAndSelect("u.rol", "rol")

        qb.select(['u.id', 'u.username', 'u.email', 'rol.id', 'rol.nombre', 'u.password'])

        if (all === "true") {
            qb.orderBy("u.id", "ASC")
        }
        else {

            qb.orderBy("u.id", "ASC")
                .skip(offset)
                .take(limit)

        }




        const [usuarios, totalItems] = await qb.getManyAndCount();

        // Calcular el número total de páginas
        const totalPages = Math.ceil(totalItems / limit);

        // Respuesta al frontend con los datos paginados
        res.json({
            usuarios,
            totalItems,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error al obtener los Usuarios paginados:', error);
        return res.status(500).json({ message: 'Error al obtener Usuarios' });
    }
};