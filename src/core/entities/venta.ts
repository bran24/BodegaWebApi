import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Cliente } from "./clientes";
import { Usuario } from "./user";
import { DetalleVenta } from "./detalleVenta";
import { Pago } from "./pago";
import { MetodoPago } from "./metodoPago";
import { TipoComprobante } from "./tipoComprobante";
@Entity({ name: 'ventas' })
export class Ventas {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Cliente, (cli) => cli.ventas, { nullable: false })
    @JoinColumn({ name: 'clienteid' })
    cliente!: Cliente

    @ManyToOne(() => Usuario, (us) => us.ventas, { nullable: false })
    @JoinColumn({ name: 'usuarioid' })
    usuario!: Usuario
    @Column()
    fecha_venta!: Date;

    @Column({ type: 'varchar', length: 10 })
    serie!: string
    @Column()
    numero!: number

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    subtotal!: number

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    igv !: number


    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total!: number

    @Column({ type: 'varchar', length: 15 })
    estado!: string

    @Column({ type: 'varchar', length: 30 , nullable: true})
    observacion!: string

    @Column({ default: true })
    isActive!: boolean;

    @ManyToOne(() => TipoComprobante,(tc)=>tc.ventas)
    @JoinColumn({ name: 'tipoComprobanteid' })
    tipo_comprobanteid!: TipoComprobante;

    
    @ManyToOne(()=>MetodoPago,(met)=>met.ventas )
    @JoinColumn({ name: 'metodoPagoid' })
    metodoPago!: MetodoPago
   


    @OneToMany(()=>DetalleVenta,(dv)=>dv.venta)
    detalleVentas!:DetalleVenta[]


    
    @OneToMany(()=>Pago,(p)=>p.venta)
    pagos!:Pago[]





    
    @CreateDateColumn()
    fecha_creacion!: Date;

    @UpdateDateColumn()
    fecha_actualizacion!: Date;









}

