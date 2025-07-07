import {
    createProveedor,
    deleteProveedor,
    updateProveedor

} from './producto.interactor';

import { ProveedorTypeORM } from '../../datasource/proveedor.datasource';

const productRepository = new ProveedorTypeORM();

export const createProveedorInteractor = createProveedor(productRepository);

export const updateProveedorInteractor = updateProveedor(productRepository);

export const deleteProveedorInteractor = deleteProveedor(productRepository);