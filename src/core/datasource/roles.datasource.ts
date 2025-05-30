import { Roles, } from "../entities"
import { RolesRepository } from "../repository/Roles.repository"
import { AppDataSource } from "../../index"
import { encrypt } from "../../utils/encrypt"
import { Console, error } from "console";

export class RolesTypeOrm implements RolesRepository {

    async findRolesByUuid(Rolesname: string): Promise<Roles | null> {
        try {

            return await AppDataSource.getRepository(Roles).findOneBy({
                nombre: Rolesname,
                isActive: true
            });
        } catch (error: any) {

            throw new Error(error);
        }

    }

    async createRoles(roles: Roles): Promise<Roles> {
        try {

            if (await this.findRolesByUuid(roles.nombre)) throw 'Rol ya registrado'


            return await AppDataSource.getRepository(Roles).save(roles)

        }
        catch (error: any) {
            throw new Error(error);
        }




    }
    async updateRoles(roles: Roles): Promise<Roles> {

        try {
            if (!await this.findRoles(roles.id)) {
                throw 'Roles no registrado';
            }
            return await AppDataSource.getRepository(Roles).save(roles)

        }

        catch (Error: any) {
            throw new Error(error)
        }

    }
    async deleteRoles(roles: Roles): Promise<Roles> {
        try {
            roles.isActive = false;
            return await AppDataSource.getRepository(Roles).save(roles);
        } catch (error: any) {
            throw new Error(error);
        }
    }
    async findRoles(id: number): Promise<Roles | null> {

        try {
            return await AppDataSource.getRepository(Roles).findOneBy({
                id: id
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

}




