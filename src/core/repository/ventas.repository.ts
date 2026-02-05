import { Ventas} from "core/entities";

export interface VentasRepository{

      createVentas(venta:Ventas): Promise<Ventas>;
      deleteVentas(ventas: Ventas): Promise<Ventas>;

      

      

    
}