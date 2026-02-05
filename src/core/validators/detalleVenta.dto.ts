import { IsNumber, IsPositive, IsBoolean, IsOptional, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';



export class DetalleVentaDto {
  @IsNumber()
  @Type(() => Number)
  productoid!: number;

  @IsDefined({ message: 'La cantidad es obligatoria' })
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @IsPositive({ message: 'La cantidad debe ser mayor que 0' })
  cantidad!: number;

  @IsDefined({ message: 'El precio unitario es obligatorio' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser mayor que 0' })
  precio_unitario!: number;


  



}