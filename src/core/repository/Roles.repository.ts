import { Roles } from '../entities';
export interface RolesRepository {
  createRoles(Roles: Roles): Promise<Roles>;
  updateRoles(Roles: Roles): Promise<Roles>;
  deleteRoles(Roles: Roles): Promise<Roles>;
  findRoles(id: number): Promise<Roles | null>;
}
