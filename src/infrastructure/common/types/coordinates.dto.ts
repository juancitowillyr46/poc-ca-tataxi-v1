import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class CoordinatesDto {

    @ApiProperty({ required: true })
    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;

    @ApiProperty({ required: true })
    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number;
    
}
  