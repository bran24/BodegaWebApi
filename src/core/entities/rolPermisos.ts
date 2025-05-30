import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { Roles } from "./roles";
import { Permisos } from "./permisos";

@Entity({ name: 'roles_permisos' })
export class RolPermiso {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Roles, (rol) => rol.rolPermisos)
    @JoinColumn({ name: 'rol_id' })
    rol!: Roles;

    @ManyToOne(() => Permisos, (permiso) => permiso.rolPermisos)
    @JoinColumn({ name: 'permiso_id' })
    permiso!: Permisos;

    @Column({ default: true })
    isActive!: boolean; // Columna para indicar si la relación rol-permiso está activa.

    @CreateDateColumn()
    fecha_creacion!: Date;

    @UpdateDateColumn()
    fecha_actualizacion!: Date;
}