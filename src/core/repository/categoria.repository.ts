import { Categoria } from '../entities';
export interface CategoriaRepository {
  createCategoria(Categoria: Categoria): Promise<Categoria>;
  updateCategoria(Categoria: Categoria): Promise<Categoria>;
  deleteCategoria(Categoria: Categoria): Promise<Categoria>;
}
