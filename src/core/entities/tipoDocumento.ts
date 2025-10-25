import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Cliente } from "./clientes";
@Entity({ name: 'tipo_documento' })

export class TipoDocumento {


  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  nombre!: string

  @Column({ nullable: true })
  descripcion!: string


  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  fecha_creacion!: Date;

  @UpdateDateColumn()
  fecha_actualizacion!: Date;

  @OneToMany(() => Cliente, (Cliente) => Cliente.tipo_documento)
  clientes!: Cliente[]







}

