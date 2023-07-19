import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { TaxiRequestStatus } from "src/domain/enums/taxi-request-status.enum";

export class TaxiRequestUpdateStatusDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly status: TaxiRequestStatus;
    
}