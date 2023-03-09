import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
export class UpdateProductDTO {
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
    @Min(0)
    price: number;
 }