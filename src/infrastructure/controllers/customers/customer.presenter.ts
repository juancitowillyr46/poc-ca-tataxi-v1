import { ApiProperty } from '@nestjs/swagger';

export class SignUpCustomerPresenter {

  @ApiProperty()
  isDone: boolean;

  @ApiProperty()
  message: string;

  constructor(signUpSuccess: boolean, message: string) {
    this.isDone = signUpSuccess;
    this.message = message;
  }
}
