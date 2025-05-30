import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    OneToMany
} from "typeorm";
import { Roles } from "./roles";
import { Permisos } from "./permisos";

@Entity({ name: 'tipoPermisos' })
export class TipoPermisos {
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


    @OneToMany(() => Permisos, (permisos) => permisos.tipoPermiso)
    permisos!: Permisos[]; // 
}