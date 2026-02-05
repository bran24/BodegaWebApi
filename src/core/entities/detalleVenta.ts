import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Ventas } from "./ventas";
import { Usuario } from "./user";
import { Producto } from "./producto";
@Entity({ name: 'detalle_venta' })
export class DetalleVenta {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Ventas, (ve) => ve.detalleVentas, { nullable: false })
    @JoinColumn({ name: 'ventaid'})
    venta!: Ventas

    @ManyToOne(() => Producto, (pro) => pro.productoVentas, { nullable: false })
    @JoinColumn({ name: 'productoid' })
    producto!: Producto

    
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    precio_unitario!: number

    @Column({type:'int'})
    cantidad!:number

       @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    subtotal!: number

    @Column({type:'boolean'})
    afecta_igv!:boolean


    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    igv !: number


    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total!: number


    @Column({ default: true })
    isActive!: boolean;
    

    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;
    @Column()
    @UpdateDateColumn()
    fecha_actualizacion!: Date;









}

