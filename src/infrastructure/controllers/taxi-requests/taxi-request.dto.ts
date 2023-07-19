import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CoordinatesDto } from "src/infrastructure/common/types/coordinates.dto";

export class TaxiRequestDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly clientId: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly driverId: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @ValidateNested()
    readonly pickupPointCoordinate: CoordinatesDto;

    @ApiProperty({ required: true })
    @IsNotEmpty()    
    readonly pickupTime: Date;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @ValidateNested()
    readonly destinationCoordinate: CoordinatesDto

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly destinationTime: Date

}