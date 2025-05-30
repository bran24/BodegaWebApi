import {
    createProducto,
    deleteProducto,
    updateProducto

} from './producto.interactor';

import { ProductoTypeORM } from '../../datasource/producto.datasource';

const productRepository = new ProductoTypeORM();

export const createProductInteractor = createProducto(productRepository);

export const updateProductInteractor = updateProducto(productRepository);

export const deleteProductInteractor = deleteProducto(productRepository);