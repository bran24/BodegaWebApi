import { DataSource } from "typeorm";
import { AppDataSource } from "../../index"

import { Producto } from '../entities/producto';
import { ProductoRepository } from '../repository/producto.repository';

export class ProductoTypeORM implements ProductoRepository {

    async findProductByid(id: number): Promise<Producto | null> {
        try {

            return await AppDataSource.getRepository(Producto).findOneBy({
                id: id,
            });
        } catch (error: any) {
            throw new Error(error);
        }

    }


    async createProducto(producto: Producto): Promise<Producto> {

        if (await AppDataSource.getRepository(Producto).findOneBy({ nombre: producto.nombre, isActive: true })) throw 'Producto ya registrado';
        return AppDataSource.getRepository(Producto).save(producto)




    }

    async updateProducto(producto: Producto): Promise<Producto> {

        try {
            const findProductByid = await this.findProductByid(producto.id);
            if (findProductByid == null) {
                throw 'Producto no registrado';
            }

            return await AppDataSource.getRepository(Producto).save(producto)


        }
        catch (error: any) {
            throw new Error(error);
        }

    }



    async deleteProducto(producto: Producto): Promise<Producto> {
        try {
            producto.isActive = false;
            return await AppDataSource.getRepository(Producto).save(producto);
        } catch (error: any) {
            throw new Error(error);
        }
    }

}
