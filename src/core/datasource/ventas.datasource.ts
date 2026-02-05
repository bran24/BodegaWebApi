import { Ventas } from "../entities"
import { VentasRepository } from "../repository/ventas.repository"
import { AppDataSource } from "../../index"


export class VentasTypeOrm implements VentasRepository {


    
    async createVentas(ventas: Ventas): Promise<Ventas> {
        try {

            

           

           

            return await AppDataSource.getRepository(Ventas).save(ventas)

        }
        catch (error: any) {
            throw new Error(error);
        }




    }

    async deleteVentas(ventas: Ventas): Promise<Ventas> {
        try {
            ventas.isActive = false;
            return await AppDataSource.getRepository(Ventas).save(ventas);
        } catch (error: any) {
            throw new Error(error);
        }
    }


}

