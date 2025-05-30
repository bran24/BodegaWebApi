import {
    createCategoria,
    deleteCategoria,
    updateCategoria

} from './categoria.interactor';

import { CategoriaTypeORM } from '../../datasource/categoria.datasource';

const CategoriaRepository = new CategoriaTypeORM();

export const createCategoriaInteractor = createCategoria(CategoriaRepository);

export const updateCategoriaInteractor = updateCategoria(CategoriaRepository);

export const deleteCategoriaInteractor = deleteCategoria(CategoriaRepository);