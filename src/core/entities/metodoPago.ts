import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ventas } from "./ventas";
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


    
    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;
    @Column()
    @UpdateDateColumn()
    fecha_actualizacion!: Date;


    @Column({ default: true })
    isActive!: boolean;
    




    



    






}