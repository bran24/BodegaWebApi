import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ventas } from "./venta";



@Entity({ name: 'tipo_comprobante' })
export class TipoComprobante {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column({ length: 2 })
    codigo_sunat!: string;

    @Column({ length: 4 })
    serie!: string; // Ej: F001, B001

    @Column({ nullable: true })
    descripcion?: string;

    @OneToMany(() => Ventas, (venta) => venta.tipo_comprobanteid)
    ventas!: Ventas[];

    @Column({ default: true })
    isActive!: boolean;



    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;
    @Column()
    @UpdateDateColumn()
    fecha_actualizacion!: Date;















}