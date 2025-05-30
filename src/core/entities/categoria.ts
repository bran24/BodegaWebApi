import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Producto } from "./producto";
@Entity({ name: "categoria" })
export class Categoria {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    nombre!: string
    @Column({ default: true })
    isActive!: boolean;

    @OneToMany(() => Producto, (prod) => prod.categoria)
    productos!: Producto[];



}

