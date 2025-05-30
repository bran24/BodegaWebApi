import { Permisos, } from "../entities"
import { PermisosRepository } from "../repository/Permisos.repository"
import { AppDataSource } from "../../index"
import { encrypt } from "../../utils/encrypt"
import { Console, error } from "console";

export class PermisosTypeOrm implements PermisosRepository {

    async findPermisosByUuid(Permisosname: string): Promise<Permisos | null> {
        try {

            return await AppDataSource.getRepository(Permisos).findOneBy({
                nombre: Permisosname,
                isActive: true
            });
        } catch (error: any) {

            throw new Error(error);
        }

    }

    async createPermisos(permisos: Permisos): Promise<Permisos> {
        try {

            if (await this.findPermisosByUuid(permisos.nombre)) throw 'Rol ya registrado'


            return await AppDataSource.getRepository(Permisos).save(permisos)

        }
        catch (error: any) {
            throw new Error(error);
        }




    }
    async updatePermisos(permisos: Permisos): Promise<Permisos> {

        try {
            if (!await this.findPermisos(permisos.id)) {
                throw 'Permiso no registrado';
            }
            return await AppDataSource.getRepository(Permisos).save(permisos)

        }

        catch (Error: any) {
            throw new Error(error)
        }

    }
    async deletePermisos(permisos: Permisos): Promise<Permisos> {
        try {
            permisos.isActive = false;
            return await AppDataSource.getRepository(Permisos).save(permisos);
        } catch (error: any) {
            throw new Error(error);
        }
    }
    async findPermisos(id: number): Promise<Permisos | null> {

        try {
            return await AppDataSource.getRepository(Permisos).findOneBy({
                id: id
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

}




