import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DriverSearchDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    latitud: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    longitud: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    radio: number;
    
}