import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class SignUpProfileDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phoneNumber: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

}