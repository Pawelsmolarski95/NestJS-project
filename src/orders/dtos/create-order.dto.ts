import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";


export class CreateOrderDTO {
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    @IsString()
    @Length(3,100)
    client: string;

    @IsNotEmpty()
    @IsString()
    @Length(3,100)
    address: string;
}