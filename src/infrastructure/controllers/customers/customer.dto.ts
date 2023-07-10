import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { AddSignUpDto } from '../security/signup.dto';

export class CustomerSignUpDto extends AddSignUpDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEmail()
    readonly username: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly confirmPassword: string;

}
