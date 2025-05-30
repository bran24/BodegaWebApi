import { Unidad } from '../entities';
export interface UnidadRepository {
  createUnidad(Unidad: Unidad): Promise<Unidad>;
  updateUnidad(Unidad: Unidad): Promise<Unidad>;
  deleteUnidad(Unidad: Unidad): Promise<Unidad>;
}
