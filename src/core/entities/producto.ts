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


import { Unidad } from "./unidad";
import { Categoria } from "./categoria";
import { Proveedor } from "./proveedor";


@Entity({ name: 'producto' })
export class Producto {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nombre!: string
    @Column({ nullable: true })
    descripcion!: string

    @Column({ type: 'decimal', precision: 6, scale: 3, default: 0 })
    precioCompra!: number
    @Column({ type: 'decimal', precision: 6, scale: 3, default: 0 })
    precioVenta!: number

    @ManyToOne(() => Unidad, (uni) => uni.productos)
    @JoinColumn({ name: 'unidadid' })
    unidad!: Unidad;

    @ManyToOne(() => Proveedor, (prov) => prov.productos, { nullable: true })
    @JoinColumn({ name: 'proveedorid' })
    proveedor!: Proveedor | null;


    @ManyToOne(() => Categoria, (categoria) => categoria.productos)
    @JoinColumn({ name: 'categoriaid' })
    categoria!: Categoria;


    @Column()
    cantidad!: number
    @Column({ default: true })
    isActive!: boolean;
    @Column({ nullable: true })
    fechaVencimiento!: Date

    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;

    @Column()
    @UpdateDateColumn()
    fecha_actualizacion!: Date;














}