import { Proveedor } from "core/entities";
export interface ProveedorRepository{
    createProveedor(proveedor:Proveedor):Promise<Proveedor>
    updateProveedor(Proveedor: Proveedor): Promise<Proveedor>;
    deleteProveedor(Proveedor: Proveedor): Promise<Proveedor>;


}