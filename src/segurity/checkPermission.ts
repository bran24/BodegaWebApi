// middlewares/checkPermission.ts
import { Request, Response, NextFunction } from 'express';

export  default (permisoRequerido: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Accedemos a lo que guardaste en tu middleware de token
        const user = res.locals.user;

        // Validamos que el usuario exista y tenga el array de permisos
        if (!user || !user.permisos) {
            return res.status(403).json({ 
                message: "Acceso denegado: No se encontraron permisos." 
            });
        }

        // Verificamos si el permiso solicitado está en su lista
        const tienePermiso = user.permisos.includes(permisoRequerido);

        if (!tienePermiso) {
            return res.status(403).json({ 
                message: `No tienes el permiso: ${permisoRequerido}` 
            });
        }

        next(); // Si todo está bien, pasamos al controlador (ej. createVentas)
    };
};