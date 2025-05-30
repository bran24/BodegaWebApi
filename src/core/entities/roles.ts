import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Usuario } from "./user"
import { Permisos } from "./permisos";
import { RolPermiso } from "./rolPermisos";

@Entity({ name: 'roles' })
export class Roles {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nombre!: string

    @Column({ nullable: true })
    descripcion!: string

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn()
    fecha_creacion!: Date;


    @UpdateDateColumn()
    fecha_actualizacion!: Date;


    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios!: Usuario[];


    @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.rol)
    rolPermisos!: RolPermiso[]; // Relación con la entidad intermedia



}