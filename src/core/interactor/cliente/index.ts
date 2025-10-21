import {
    createCliente,
    findCliente
    , deleteCliente
    , updateCliente

} from './cliente.interactor';

import { ClienteTypeOrm } from '../../datasource/cliente.datasource';

const clienteRepository = new ClienteTypeOrm();

export const createClienteInteractor = createCliente(clienteRepository);

export const updateClienteInteractor = updateCliente(clienteRepository);

export const deleteClienteInteractor = deleteCliente(clienteRepository);

export const findClienteInteractor = findCliente(clienteRepository);
