// import { product } from 'security';
import { Roles } from '../../entities/roles'
import { RolesRepository } from '../../repository/Roles.repository';

export const createRoles = (RolesRepository: RolesRepository) => async (
    Roles: Roles
) => RolesRepository.createRoles(Roles);


export const updateRoles = (RolesRepository: RolesRepository) => async (
    Roles: Roles
) => RolesRepository.updateRoles(Roles);


export const deleteRoles = (RolesRepository: RolesRepository
) => async (
    Roles: Roles
) => RolesRepository.deleteRoles(Roles);


export const findRoles = (RolesRepository: RolesRepository) => async (id: number) => {
    return RolesRepository.findRoles(id)
}