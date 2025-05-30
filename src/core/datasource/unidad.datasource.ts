import { DataSource } from "typeorm";
import { AppDataSource } from "../../index"

import { Unidad } from '../entities/unidad';
import { UnidadRepository } from '../repository/unidad.repository';

export class UnidadTypeORM implements UnidadRepository {

    async findUnidadByid(id: number): Promise<Unidad | null> {
        try {

            return await AppDataSource.getRepository(Unidad).findOneBy({
                id: id,
            });
        } catch (error: any) {
            throw new Error(error);
        }

    }


    async createUnidad(unidad: Unidad): Promise<Unidad> {

        if (
            await AppDataSource.getRepository(Unidad).findOneBy({
                nombre: unidad.nombre, isActive: true
            })) throw 'Unidad ya registrado';
        return AppDataSource.getRepository(Unidad).save(unidad)




    }

    async updateUnidad(unidad: Unidad): Promise<Unidad> {

        try {
            const findUnidadByid = await this.findUnidadByid(unidad.id);
            if (findUnidadByid == null) {
                throw 'unidad no registrada';
            }

            return await AppDataSource.getRepository(Unidad).save(unidad)


        }
        catch (error: any) {
            throw new Error(error);
        }

    }



    async deleteUnidad(unidad: Unidad): Promise<Unidad> {
        try {
            unidad.isActive = false;
            return await AppDataSource.getRepository(Unidad).save(unidad);
        } catch (error: any) {
            throw new Error(error);
        }
    }

}
