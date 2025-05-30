// import { product } from 'security';
import { Usuario } from '../../entities/';
import { UsuarioRepository } from '../../repository/usuario.repository';

export const createUsuario = (usuarioRepository: UsuarioRepository) => async (
    usuario: Usuario
) => usuarioRepository.createUsuario(usuario);


export const updateUsuario = (usuarioRepository: UsuarioRepository) => async (
    usuario: Usuario
) => usuarioRepository.updateUsuario(usuario);


export const deleteUsuario = (usuarioRepository: UsuarioRepository
) => async (
    usuario: Usuario
) => usuarioRepository.deleteUsuario(usuario);

export const findUsuario = (usuarioRepository: UsuarioRepository) => async (usuario: Usuario) => {
    usuarioRepository.findUsuario(usuario.id)
}
