// import { product } from 'security';
import { Unidad } from '../../entities/unidad';
import { UnidadRepository } from '../../repository/unidad.repository';

export const createUnidad = (UnidadRepository: UnidadRepository) => async (
    Unidad: Unidad
) => UnidadRepository.createUnidad(Unidad);


export const updateUnidad = (UnidadRepository: UnidadRepository) => async (
    Unidad: Unidad
) => UnidadRepository.updateUnidad(Unidad);


export const deleteUnidad = (UnidadRepository: UnidadRepository
) => async (
    Unidad: Unidad
) => UnidadRepository.deleteUnidad(Unidad);
