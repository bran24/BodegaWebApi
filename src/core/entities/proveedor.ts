import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne
} from "typeorm";



@Entity({ name: 'proveedor' })
export class Proveedor {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nombre!: string
    @Column({ nullable: true })
    descripcion!: string
    @Column()
    contacto!: string
    @Column()
    email!: string
    @Column()
    telefono!: string
    @Column()
    direccion!: string
    @Column()
    pais!: string
    @Column({ default: true })
    isActive!: boolean;
    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;
    @Column()
    @UpdateDateColumn()
    fecha_actualizacion!: Date;














}