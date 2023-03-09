import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @Length(1, 122)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
