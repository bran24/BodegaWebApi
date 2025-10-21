import { Cliente } from '../entities';
export interface ClienteRepository {
  createCliente(cliente: Cliente): Promise<Cliente>;
  updateCliente(cliente: Cliente): Promise<Cliente>;
  deleteCliente(cliente: Cliente): Promise<Cliente>;
  findCliente(id: number): Promise<Cliente | null>;
}
