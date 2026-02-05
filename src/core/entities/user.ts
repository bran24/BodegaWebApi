import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { Roles } from "./roles"
import { Ventas } from "./ventas";


@Entity({ name: 'usuario' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    username!: string
    @Column()
    password!: string
    @Column()
    email!: string

    @Column({ default: true })
    isActive!: boolean;



    @CreateDateColumn()
    fecha_creacion!: Date;


    @UpdateDateColumn()
    fecha_actualizacion!: Date;



    @ManyToOne(() => Roles, (rol) => rol.usuarios)
    @JoinColumn({ name: 'rolid' })
    rol!: Roles;

    @OneToMany(()=> Ventas,(vent)=>vent.usuario)
    ventas!:Ventas[];






}