
import { Response, Request } from 'express'

import { AppDataSource } from '../index'

import { Permisos, RolPermiso, Roles, Usuario } from "../core/entities"


import { In } from 'typeorm';
import { deleteRolesInteractor } from "./../core/interactor/roles/";

export const createRolPermisos = async (req: Request, res: Response): Promise<Response> => {
    const queryRunner = AppDataSource.createQueryRunner();

    try {
        const { rolId, permisosId } = req.body as {
            rolId: number;
            permisosId: number[];
        };

        // Iniciar la transacción
        await queryRunner.startTransaction();

        // Buscar el rol
        const rol = await queryRunner.manager.findOne(Roles, { where: { id: rolId } });
        if (!rol) {
            throw new Error('Rol no existe');
        }

        // Buscar los permisos asociados
        const permisos = await queryRunner.manager.find(Permisos, {
            where: { id: In(permisosId) }
        });
        if (permisos.length !== permisosId.length) {
            const missingIds = permisosId.filter(id => !permisos.find(p => p.id === id));
            throw new Error(`Permiso(s) con id(s) ${missingIds.join(', ')} no existe(n)`);
        }

        // Crear las relaciones rol-permiso
        const rolPermisos = permisos.map(permiso => {
            const rolPermiso = new RolPermiso();
            rolPermiso.rol = rol;
            rolPermiso.permiso = permiso;
            return rolPermiso;
        });

        // Guardar las relaciones en la base de datos
        await queryRunner.manager.save(RolPermiso, rolPermisos);

        // Confirmar la transacción
        await queryRunner.commitTransaction();

        return res.json({ result: "Rol y permisos registrados con éxito" });
    } catch (error: any) {
        await queryRunner.rollbackTransaction();
        return res.status(500).json({ message: error.message ?? error });
    } finally {
        await queryRunner.release();
    }

}




export const listRolPermisos = async (req: Request, res: Response): Promise<Response> => {


    try {

        const prop = await AppDataSource.getRepository(RolPermiso).findBy({ isActive: true })



        return res.json({ result: prop });

    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }


}



export const updateRolPermisos = async (req: Request, res: Response): Promise<Response> => {
    const queryRunner = AppDataSource.createQueryRunner();

    try {
        const { rolId, permisosId } = req.body as {
            rolId: number;
            permisosId: number[];
        };

        // Iniciar la transacción
        await queryRunner.startTransaction();

        // Buscar el rol
        const rol = await queryRunner.manager.findOne(Roles, { where: { id: rolId } });
        if (!rol) {
            throw new Error('Rol no existe');
        }

        // Obtener las relaciones actuales de RolPermiso
        const rolPermisosExistentes = await queryRunner.manager.find(RolPermiso, {
            where: { rol: { id: rolId }, isActive: true }, // Solo permisos activos
            relations: ['permiso']
        });

        // Obtener los permisos actuales como un array de IDs
        const permisosActualesIds = rolPermisosExistentes.map(rp => rp.permiso.id);

        // Desactivar permisos que ya no están en la nueva lista
        for (const rolPermiso of rolPermisosExistentes) {
            if (!permisosId.includes(rolPermiso.permiso.id)) {
                rolPermiso.isActive = false; // Marcar como inactiva
                await queryRunner.manager.save(RolPermiso, rolPermiso); // Guardar los cambios
            }
        }

        // Buscar los permisos asociados
        const permisos = await queryRunner.manager.find(Permisos, {
            where: { id: In(permisosId) }
        });
        if (permisos.length !== permisosId.length) {
            const missingIds = permisosId.filter(id => !permisos.find(p => p.id === id));
            throw new Error(`Permiso(s) con id(s) ${missingIds.join(', ')} no existe(n)`);
        }

        // Crear o actualizar relaciones rol-permiso
        for (const permiso of permisos) {
            const existingRelation = rolPermisosExistentes.find(rp => rp.permiso.id === permiso.id);

            if (existingRelation) {
                // Si ya existe y está inactiva, reactívala
                if (!existingRelation.isActive) {
                    existingRelation.isActive = true;
                    await queryRunner.manager.save(RolPermiso, existingRelation);
                }
            } else {
                // Si no existe, crear una nueva relación
                const newRolPermiso = new RolPermiso();
                newRolPermiso.rol = rol;
                newRolPermiso.permiso = permiso;
                newRolPermiso.isActive = true; // Activar la nueva relación
                await queryRunner.manager.save(RolPermiso, newRolPermiso);
            }
        }

        // Confirmar la transacción
        await queryRunner.commitTransaction();

        return res.json({ result: "Permisos del rol actualizados con éxito" });
    } catch (error: any) {
        // Si algo falla, deshacer la transacción
        await queryRunner.rollbackTransaction();
        return res.status(500).json({ message: error.message ?? error });
    } finally {
        // Liberar el query runner
        await queryRunner.release();
    }
};



export const searchPermisosPorRol = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const rolId = +req.params.id; // Asegúrate de que el ID del rol se pase como parámetro
        const rolPermisos = await AppDataSource.getRepository(RolPermiso)
            .createQueryBuilder('rolPermiso')
            .leftJoinAndSelect('rolPermiso.rol', 'rol') // Unir con la entidad Rol
            .leftJoinAndSelect('rolPermiso.permiso', 'permiso')
            .select(['rolPermiso.id', 'permiso.id'])
            .where('rol.id = :rolId', { rolId }) // Filtrar por ID de rol
            .andWhere('rolPermiso.isActive = :isActive', { isActive: true })
            // Filtrar por ID de rol
            .getMany();



        return res.status(200).json({ result: rolPermisos });
    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }




};


export const deleteRolPermiso = async (req: Request, res: Response): Promise<Response> => {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
        const rolId = +req.params.id;

        const roles = await AppDataSource.getRepository(Roles).findOne({
            where: { id: rolId, isActive: true },
        });

        if (!roles) {
            return res.status(400).json({ message: "El rol no existe." });
        }

        // Verificar si hay usuarios asociados a este rol y que estén activos
        const usuarios = await AppDataSource.getRepository(Usuario).find({
            where: { rol: { id: rolId }, isActive: true },
            relations: ['rol']
        });
        console.log(roles)

        console.log(usuarios)

        if (usuarios.length > 0) {
            return res.status(400).json({ message: "No se puede eliminar el rol, ya que hay usuarios activos asociados." });
        }


        await queryRunner.startTransaction();

        // Obtener las relaciones actuales de RolPermiso
        const rolPermisosExistentes = await queryRunner.manager.find(RolPermiso, {
            where: { rol: { id: rolId }, isActive: true }, // Solo permisos activos
        });

        // Desactivar permisos
        for (const rolPermiso of rolPermisosExistentes) {
            rolPermiso.isActive = false;
            await queryRunner.manager.save(RolPermiso, rolPermiso); // Guardar cambios
        }

        // Eliminar el rol (puedes ajustar según cómo implementes deleteRolesInteractor)
        await deleteRolesInteractor(roles);

        // Confirmar la transacción
        await queryRunner.commitTransaction();

        return res.status(200).json({ result: "Rol eliminado con éxito" });
    } catch (error: any) {
        // Revertir la transacción en caso de error
        await queryRunner.rollbackTransaction();
        return res.status(500).json({ message: error.message ?? error });
    } finally {
        // Liberar el queryRunner
        await queryRunner.release();
    }
};