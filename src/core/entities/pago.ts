import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ventas } from "./venta";
import { MetodoPago } from "./metodoPago";
@Entity({ name: 'pago' })
export class Pago {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Ventas, (ve) => ve.pagos, { nullable: false })
    @JoinColumn({ name: 'ventaid'})
    venta!: Ventas

    @Column()
    fecha!: Date;

    
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    monto!: number


    @ManyToOne(()=>MetodoPago,(met)=>met.pagos)
    @JoinColumn({ name: 'metodoPagoid' })
    metodoPago!: MetodoPago


    @Column({ type: 'varchar', length: 30, nullable:true })
    observacion!: string



    @Column({ default: true })
    isActive!: boolean;
    

    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;
    @Column()
    @UpdateDateColumn()
    fecha_actualizacion!: Date;









}

