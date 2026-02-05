import {
    createVentas,
    deleteVentas


} from './venta.interactor';

import { VentasTypeOrm } from '../../datasource/ventas.datasource';

const productRepository = new VentasTypeOrm();

export const createVentasInteractor = createVentas(productRepository);


export const deleteVentasInteractor = deleteVentas(productRepository);