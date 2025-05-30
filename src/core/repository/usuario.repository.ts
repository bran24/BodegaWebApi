import { Usuario } from '../entities';
export interface UsuarioRepository {
  createUsuario(usuario: Usuario): Promise<Usuario>;
  updateUsuario(usuario: Usuario): Promise<Usuario>;
  deleteUsuario(usuario: Usuario): Promise<Usuario>;
  findUsuario(id: number): Promise<Usuario | null>;
}
