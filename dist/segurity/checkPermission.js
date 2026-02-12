"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (permisoRequerido) => {
    return (req, res, next) => {
        const user = res.locals.user;
        if (!user || !user.permisos) {
            return res.status(403).json({
                message: "Acceso denegado: No se encontraron permisos."
            });
        }
        const tienePermiso = user.permisos.includes(permisoRequerido);
        if (!tienePermiso) {
            return res.status(403).json({
                message: `No tienes el permiso: ${permisoRequerido}`
            });
        }
        next();
    };
};
