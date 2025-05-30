import {
    createUsuario,
    findUsuario
    , deleteUsuario
    , updateUsuario

} from './usuario.interactor';

import { UsuarioTypeOrm } from '../../datasource/usuario.datasource';

const usuarioRepository = new UsuarioTypeOrm();

export const createUsuarioInteractor = createUsuario(usuarioRepository);

export const updateUsuarioInteractor = updateUsuario(usuarioRepository);

export const deleteUsuarioInteractor = deleteUsuario(usuarioRepository);

export const findUsuarioInteractor = findUsuario(usuarioRepository);
