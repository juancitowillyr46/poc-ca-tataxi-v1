import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { SignUpDto } from '../security/signup.dto';

export class CustomerSignUpDto extends SignUpDto {
    // Custom attribute
    
}
