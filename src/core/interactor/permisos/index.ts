import {
    createPermisos,
    deletePermisos,
    updatePermisos,
    findPermisos

} from './permisos.interactor';

import { PermisosTypeOrm } from '../../datasource/permisos.datasource';

const PermisosRepository = new PermisosTypeOrm();

export const createPermisosInteractor = createPermisos(PermisosRepository);

export const updatePermisosInteractor = updatePermisos(PermisosRepository);

export const deletePermisosInteractor = deletePermisos(PermisosRepository);
export const findPermisosInteractor = findPermisos(PermisosRepository)