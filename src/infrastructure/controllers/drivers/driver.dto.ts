import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class DriverDto {
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly userId: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly assetId: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly deviceId: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly licenseNumber: string;

}