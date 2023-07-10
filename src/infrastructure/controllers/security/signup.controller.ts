import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { SignUpPresenter } from './signup.presenter';
import { AddSignUpDto } from './signup.dto';
import { SignUpM } from 'src/domain/model/sign-up';
import { postSignUpUseCases } from 'src/usecases/signup/postSignUpUseCase';

@Controller('Security')
@ApiTags('Security')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(SignUpPresenter)
export class SignUpController {
  constructor(
    @Inject(UsecasesProxyModule.POST_SIGNUP_USECASES_PROXY)
    private readonly postSignUpUseCases: UseCaseProxy<postSignUpUseCases>,
  ) {}

  @Post('sign-up')
  @ApiResponseType(SignUpPresenter, true)
  async signUp(@Body() addSignUpDto: AddSignUpDto) {

    let signUpM = new SignUpM();
    signUpM.username = addSignUpDto.username;
    signUpM.confirmPassword = addSignUpDto.confirmPassword;
    signUpM.password = addSignUpDto.password;

    const signUpSuccess = await this.postSignUpUseCases.getInstance().execute(signUpM);
    return new SignUpPresenter(signUpSuccess);
  }
}
