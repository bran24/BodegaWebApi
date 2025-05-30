import {
    createRoles,
    deleteRoles,
    updateRoles,
    findRoles

} from './roles.interactor';

import { RolesTypeOrm } from '../../datasource/roles.datasource';

const RolesRepository = new RolesTypeOrm();

export const createRolesInteractor = createRoles(RolesRepository);

export const updateRolesInteractor = updateRoles(RolesRepository);

export const deleteRolesInteractor = deleteRoles(RolesRepository);
export const findRolesInteractor = findRoles(RolesRepository)