import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ventas } from "./venta";
import { Pago } from "./pago";


@Entity({ name: 'metodo_pago' })
export class MetodoPago
{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({type:'varchar'})
    nombre!:string
    @Column({type:'varchar'})
    descripcion!:string
    @OneToMany(() => Pago, (pago) => pago.metodoPago)
    pagos!: Pago[];
    @OneToMany(() => Ventas, (ven) => ven.metodoPago)
    ventas!: Ventas[];
    



    






}