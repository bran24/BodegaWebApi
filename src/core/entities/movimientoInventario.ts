import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./producto";

export enum TipoMovimiento {
  ENTRADA = "ENTRADA",
  SALIDA = "SALIDA",
}

@Entity({ name: 'movimiento_inventario' })
export class MovimientoInventario {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'productoid' })
  producto!: Producto;

  @Column({ type: 'enum', enum: TipoMovimiento })
  tipo!: TipoMovimiento;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad!: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  referencia!: string; // Ej: "Venta N° 123", "Compra N° 50"



  @CreateDateColumn()
  fecha_creacion!: Date;

  @UpdateDateColumn()
  fecha_actualizacion!: Date;


}