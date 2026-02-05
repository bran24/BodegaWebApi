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
import { DetalleVenta } from "./detalleVenta";
import { MovimientoInventario } from "./movimientoInventario";


@Entity({ name: 'producto' })
export class Producto {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nombre!: string
    @Column({ unique: true })
    sku!: string; // Ej: "PROD-00001" o "BEB-00001"
    // Código de barras (OPCIONAL, solo si el producto lo tiene)
    @Column({ unique: true, nullable: true, length: 20 })
    codigoBarras!: string; // Ej: "7750182003568"
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

    @Column({ default: false })
    afecta_igv!: boolean;

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

    @OneToMany(() => DetalleVenta, (dv) => dv.venta)
    productoVentas!: DetalleVenta[]

    @OneToMany(() => MovimientoInventario, (mov) => mov.producto)
    movimientos!: MovimientoInventario[];















}