import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Roles } from "./roles";
import { RolPermiso } from "./rolPermisos";
import { TipoPermisos } from "./tipoPermiso";

@Entity({ name: 'permisos' })
export class Permisos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column({ nullable: true })
    descripcion!: string;

    @CreateDateColumn()
    fecha_creacion!: Date;

    @UpdateDateColumn()
    fecha_actualizacion!: Date;

    @Column({ default: true })
    isActive!: boolean;

    @ManyToOne(() => TipoPermisos, (tipoPermiso) => tipoPermiso.permisos, { nullable: true })
    @JoinColumn({ name: 'tipoPermisoid' })
    tipoPermiso!: TipoPermisos;


    @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.permiso)
    rolPermisos!: RolPermiso[]; // 
}