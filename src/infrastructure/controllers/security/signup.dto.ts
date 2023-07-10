import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddSignUpDto {

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

// export class AddTodoDto {
//   /*@ApiProperty({ required: true })
//   @IsNotEmpty()
//   @IsString()
//   readonly content: string;*/
// }
