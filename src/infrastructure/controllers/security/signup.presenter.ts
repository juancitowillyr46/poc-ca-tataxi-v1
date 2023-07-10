import { ApiProperty } from '@nestjs/swagger';
import { TodoM } from '../../../domain/model/todo';
import { SignUpM } from 'src/domain/model/sign-up';

export class SignUpPresenter {

  @ApiProperty()
  isDone: boolean;

  constructor(signUpSuccess: boolean) {
    this.isDone = signUpSuccess;
  }
}
