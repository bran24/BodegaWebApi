import { Producto } from '../entities';
export interface ProductoRepository {
  createProducto(Producto: Producto): Promise<Producto>;
  updateProducto(Producto: Producto): Promise<Producto>;
  deleteProducto(Producto: Producto): Promise<Producto>;
}
