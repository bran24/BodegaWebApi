// import { product } from 'security';
import { Permisos } from '../../entities/permisos'
import { PermisosRepository } from '../../repository/Permisos.repository';

export const createPermisos = (PermisosRepository: PermisosRepository) => async (
    Permisos: Permisos
) => PermisosRepository.createPermisos(Permisos);


export const updatePermisos = (PermisosRepository: PermisosRepository) => async (
    Permisos: Permisos
) => PermisosRepository.updatePermisos(Permisos);


export const deletePermisos = (PermisosRepository: PermisosRepository
) => async (
    Permisos: Permisos
) => PermisosRepository.deletePermisos(Permisos);


export const findPermisos = (PermisosRepository: PermisosRepository) => async (id: number) => {
    return PermisosRepository.findPermisos(id)
}