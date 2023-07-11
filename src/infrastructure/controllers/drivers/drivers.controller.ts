import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';

import { SignUpM } from 'src/domain/model/sign-up';
import { SignUpDriverPresenter } from './driver.presenter';
import { DriverSignUpDto } from './driver.dto';
import { postDriversSignUpUseCases } from 'src/usecases/drivers/postSignUpDriversUseCases';


@Controller('drivers')
@ApiTags('Drivers')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(SignUpDriverPresenter)
export class DriversController {
  constructor(
    @Inject(UsecasesProxyModule.POST_DRIVERS_SIGN_UP_USECASE_PROXY)
    private readonly postDriversSignUpUseCases: UseCaseProxy<postDriversSignUpUseCases>,
  ) {}

  @Post('sign-up')
  @ApiResponseType(SignUpDriverPresenter, true)
  async signUp(@Body() addSignUpDto: DriverSignUpDto) {

    let signUpM = new SignUpM();
    signUpM.username = addSignUpDto.username;
    signUpM.confirmPassword = addSignUpDto.confirmPassword;
    signUpM.password = addSignUpDto.password;

    const signUpSuccess = await this.postDriversSignUpUseCases.getInstance().execute(signUpM);
    return new SignUpDriverPresenter(signUpSuccess, 'Gracias por registrarse');
  }
}
