import { DataSource } from "typeorm";
import { AppDataSource } from "../../index"

import { Categoria } from '../entities/categoria';
import { CategoriaRepository } from '../repository/categoria.repository';

export class CategoriaTypeORM implements CategoriaRepository {

    async findCategoriaByid(id: number): Promise<Categoria | null> {
        try {

            return await AppDataSource.getRepository(Categoria).findOneBy({
                id: id,
            });
        } catch (error: any) {
            throw new Error(error);
        }

    }


    async createCategoria(categoria: Categoria): Promise<Categoria> {

        if (await await AppDataSource.getRepository(Categoria).findOneBy({
            nombre: categoria.nombre, isActive: true
        })) throw 'Categoria ya registrado';
        return AppDataSource.getRepository(Categoria).save(categoria)




    }

    async updateCategoria(categoria: Categoria): Promise<Categoria> {

        try {
            const findCategoriaByid = await this.findCategoriaByid(categoria.id);
            if (findCategoriaByid == null) {
                throw 'categoria no registrada';
            }

            return await AppDataSource.getRepository(Categoria).save(categoria)


        }
        catch (error: any) {
            throw new Error(error);
        }

    }



    async deleteCategoria(categoria: Categoria): Promise<Categoria> {
        try {
            categoria.isActive = false;
            return await AppDataSource.getRepository(Categoria).save(categoria);
        } catch (error: any) {
            throw new Error(error);
        }
    }

}
