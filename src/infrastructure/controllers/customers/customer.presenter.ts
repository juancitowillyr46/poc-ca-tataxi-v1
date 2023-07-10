import { ApiProperty } from '@nestjs/swagger';

export class SignUpCustomerPresenter {

  @ApiProperty()
  isDone: boolean;

  constructor(signUpSuccess: boolean) {
    this.isDone = signUpSuccess;
  }
}
