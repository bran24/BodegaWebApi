// import { product } from 'security';
import { Categoria } from '../../entities/categoria';
import { CategoriaRepository } from '../../repository/categoria.repository';

export const createCategoria = (CategoriaRepository: CategoriaRepository) => async (
    Categoria: Categoria
) => CategoriaRepository.createCategoria(Categoria);


export const updateCategoria = (CategoriaRepository: CategoriaRepository) => async (
    Categoria: Categoria
) => CategoriaRepository.updateCategoria(Categoria);


export const deleteCategoria = (CategoriaRepository: CategoriaRepository
) => async (
    Categoria: Categoria
) => CategoriaRepository.deleteCategoria(Categoria);
