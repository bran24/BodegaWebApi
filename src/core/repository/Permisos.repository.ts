import { Permisos } from '../entities';
export interface PermisosRepository {
  createPermisos(Permisos: Permisos): Promise<Permisos>;
  updatePermisos(Permisos: Permisos): Promise<Permisos>;
  deletePermisos(Permisos: Permisos): Promise<Permisos>;
  findPermisos(id: number): Promise<Permisos | null>;
}
