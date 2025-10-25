import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,

} from "typeorm";
import { TipoDocumento } from "./tipoDocumento";
import { Ventas } from "./venta";




@Entity({ name: 'cliente' })
export class Cliente {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nombre!:string 
    
    @ManyToOne(() => TipoDocumento, (tipo) => tipo.clientes)
    @JoinColumn({ name: 'tipo_documento_id' })
    tipo_documento!: TipoDocumento | null;

    @OneToMany(()=>Ventas,(vent)=>vent.cliente)
    ventas!:Ventas[]




    @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
    numero_documento!:string
    @Column({length: 255,nullable:true})
    direccion!:string
    @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
    correo!: string;
    @Column({ type: 'varchar', length: 20, nullable: true })
    telefono!: string;
    @Column({ type: 'boolean', default: false })
    es_empresa!: boolean;
    @Column({ default: true })
    isActive!: boolean;
    @CreateDateColumn()
    fecha_creacion!: Date;
    @UpdateDateColumn()
    fecha_actualizacion!: Date;




}