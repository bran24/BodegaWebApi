// import { product } from 'security';
import { Cliente } from '../../entities';
import { ClienteRepository } from '../../repository/cliente.repository';

export const createCliente = (clienteRepository: ClienteRepository) => async (
    cliente: Cliente
) => clienteRepository.createCliente(cliente);


export const updateCliente = (clienteRepository: ClienteRepository) => async (
    cliente: Cliente
) => clienteRepository.updateCliente(cliente);


export const deleteCliente = (clienteRepository: ClienteRepository
) => async (
    cliente: Cliente
) => clienteRepository.deleteCliente(cliente);

export const findCliente = (clienteRepository: ClienteRepository) => async (cliente: Cliente) => {
    clienteRepository.findCliente(cliente.id)
}
