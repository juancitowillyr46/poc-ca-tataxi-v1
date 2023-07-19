import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { SignUpDto } from '../security/signup.dto';

export class DriverSignUpDto extends SignUpDto {
    // Driver attribute
    // @ApiProperty({ required: true })
    // @IsNotEmpty()
    // readonly license_number: string;
}
