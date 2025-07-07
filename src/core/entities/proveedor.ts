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
    @Column({ nullable: true })
    contacto!: string
    @Column({ nullable: true })
    email!: string
    @Column()
    telefono!: string
    @Column({ nullable: true })
    direccion!: string
    @Column({ nullable: true })
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