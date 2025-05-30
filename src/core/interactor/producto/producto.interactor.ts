// import { product } from 'security';
import { Producto } from '../../entities/producto';
import { ProductoRepository } from '../../repository/producto.repository';

export const createProducto = (productoRepository: ProductoRepository) => async (
    producto: Producto
) => productoRepository.createProducto(producto);


export const updateProducto = (productoRepository: ProductoRepository) => async (
    producto: Producto
) => productoRepository.updateProducto(producto);


export const deleteProducto = (productoRepository: ProductoRepository
) => async (
    producto: Producto
) => productoRepository.deleteProducto(producto);
