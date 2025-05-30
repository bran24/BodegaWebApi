import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Producto } from "./producto";
@Entity({ name: "unidad" })
export class Unidad {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    nombre!: string
    @Column()
    abreviatura!: string
    @Column({ default: true })
    isActive!: boolean;

    @OneToMany(() => Producto, (prod) => prod.unidad)
    productos!: Producto[];







}

