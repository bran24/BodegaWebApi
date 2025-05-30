import {
    createUnidad,
    deleteUnidad,
    updateUnidad

} from './unidad.interactor';

import { UnidadTypeORM } from '../../datasource/unidad.datasource';

const UnidadRepository = new UnidadTypeORM();

export const createUnidadInteractor = createUnidad(UnidadRepository);

export const updateUnidadInteractor = updateUnidad(UnidadRepository);

export const deleteUnidadInteractor = deleteUnidad(UnidadRepository);