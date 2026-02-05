// import { product } from 'security';
import { Ventas } from '../../entities/ventas';
import { VentasRepository } from '../../repository/ventas.repository';

export const createVentas = (ventasRepository: VentasRepository) => async (
    ventas: Ventas
) => ventasRepository.createVentas(ventas);



export const deleteVentas = (ventasRepository: VentasRepository
) => async (
    ventas: Ventas
) => ventasRepository.deleteVentas(ventas);
