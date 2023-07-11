import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { SignUpDto } from '../security/signup.dto';

export class DriverSignUpDto extends SignUpDto {

    // @ApiProperty({ required: true })
    // @IsNotEmpty()
    // @IsEmail()
    // readonly username: string;

    // @ApiProperty({ required: true })
    // @IsNotEmpty()
    // readonly password: string;

    // @ApiProperty({ required: true })
    // @IsNotEmpty()
    // readonly confirmPassword: string;

}
