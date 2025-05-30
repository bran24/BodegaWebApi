import { Usuario } from "../entities"
import { UsuarioRepository } from "../repository/usuario.repository"
import { AppDataSource } from "../../index"
import { encrypt } from "../../utils/encrypt"
import { Console, error } from "console";

export class UsuarioTypeOrm implements UsuarioRepository {

    async findUserByUuid(username: string): Promise<Usuario | null> {
        try {

            return await AppDataSource.getRepository(Usuario).findOne({
                where: { username: username, isActive: true },
                relations: ['rol'],
            });
        } catch (error: any) {

            throw new Error(error);
        }

    }

    async createUsuario(usuario: Usuario): Promise<Usuario> {
        try {

            if (await this.findUserByUuid(usuario.username)) throw 'Usuario ya registrado'

            usuario.password = await encrypt(usuario.password)

            return await AppDataSource.getRepository(Usuario).save(usuario)

        }
        catch (error: any) {
            throw new Error(error);
        }




    }
    async updateUsuario(usuario: Usuario): Promise<Usuario> {

        try {

            return await AppDataSource.getRepository(Usuario).save(usuario)

        }

        catch (Error: any) {
            throw new Error(error)
        }

    }
    async deleteUsuario(usuario: Usuario): Promise<Usuario> {
        try {
            usuario.isActive = false;
            return await AppDataSource.getRepository(Usuario).save(usuario);
        } catch (error: any) {
            throw new Error(error);
        }
    }
    async findUsuario(id: number): Promise<Usuario | null> {

        try {
            return await AppDataSource.getRepository(Usuario).findOneBy({
                id: id
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

}

