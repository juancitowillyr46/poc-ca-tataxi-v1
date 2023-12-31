import { ApiProperty } from '@nestjs/swagger';

export class SignUpPresenter {

  @ApiProperty()
  isDone: boolean;

  constructor(signUpSuccess: boolean) {
    this.isDone = signUpSuccess;
  }
}
