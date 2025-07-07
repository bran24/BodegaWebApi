import { DataSource } from "typeorm";
import { AppDataSource } from "../../index"

import { Proveedor } from '../entities/proveedor';
import { ProveedorRepository } from '../repository/proveedor.repository';

export class ProveedorTypeORM implements ProveedorRepository {

    async findProvByid(id: number): Promise<Proveedor | null> {
        try {

            return await AppDataSource.getRepository(Proveedor).findOneBy({
                id: id,
            });
        } catch (error: any) {
            throw new Error(error);
        }

    }


    async createProveedor(proveedor: Proveedor): Promise<Proveedor> {

        if (await AppDataSource.getRepository(Proveedor).findOneBy({ nombre: proveedor.nombre, isActive: true })) throw 'Proveedor ya registrado';
        return AppDataSource.getRepository(Proveedor).save(proveedor)




    }

    async updateProveedor(proveedor: Proveedor): Promise<Proveedor> {

        try {
            const findProdvByid = await this.findProvByid(proveedor.id);
            if (findProdvByid == null) {
                throw 'Proveedor no registrado';
            }

            return await AppDataSource.getRepository(Proveedor).save(proveedor)


        }
        catch (error: any) {
            throw new Error(error);
        }

    }



    async deleteProveedor(proveedor: Proveedor): Promise<Proveedor> {
        try {
            proveedor.isActive = false;
            return await AppDataSource.getRepository(Proveedor).save(proveedor);
        } catch (error: any) {
            throw new Error(error);
        }
    }

}
