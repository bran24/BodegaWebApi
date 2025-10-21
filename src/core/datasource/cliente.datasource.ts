import { Cliente } from "../entities"
import { ClienteRepository } from "../repository/cliente.repository"
import { AppDataSource } from "../../index"
import { encrypt } from "../../utils/encrypt"
import { Console, error } from "console";

export class ClienteTypeOrm implements ClienteRepository {

    async findClienteByUuid(numero_documento: string): Promise<Cliente | null> {
        try {

            return await AppDataSource.getRepository(Cliente).findOne({
                where: { numero_documento: numero_documento, isActive: true }
      
            });
        } catch (error: any) {

            throw new Error(error);
        }

    }

    async createCliente(cliente: Cliente): Promise<Cliente> {
        try {

           

           

            return await AppDataSource.getRepository(Cliente).save(cliente)

        }
        catch (error: any) {
            throw new Error(error);
        }




    }
    async updateCliente(cliente: Cliente): Promise<Cliente> {

        try {

            return await AppDataSource.getRepository(Cliente).save(cliente)

        }

        catch (Error: any) {
            throw new Error(error)
        }

    }
    async deleteCliente(cliente: Cliente): Promise<Cliente> {
        try {
            cliente.isActive = false;
            return await AppDataSource.getRepository(Cliente).save(cliente);
        } catch (error: any) {
            throw new Error(error);
        }
    }
    async findCliente(id: number): Promise<Cliente | null> {

        try {
            return await AppDataSource.getRepository(Cliente).findOneBy({
                id: id
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

}

