import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';

import { SignUpM } from 'src/domain/model/signup';
import { DriverSignUpPresenter } from './driver-signup.presenter';
import { DriverSignUpDto } from './driver-signup.dto';
import { postDriversSignUpUseCases } from 'src/usecases/drivers/postDriversSignUpUseCases';
import { DriverSignUpM } from 'src/domain/model/drivers/driver-signup';
import { DriverDto } from './driver.dto';
import { postDriversCreateUseCases } from 'src/usecases/drivers/postDriversCreateUseCases';
import { DriverM } from 'src/domain/model/drivers/driver';
import { DriverPresenter } from './driver.presenter';


@Controller('drivers')
@ApiTags('Drivers')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(DriverPresenter)
@ApiExtraModels(DriverSignUpPresenter)

export class DriversController {
  constructor(
    @Inject(UsecasesProxyModule.POST_DRIVERS_SIGN_UP_USECASE_PROXY)
    private readonly postDriversSignUpUseCases: UseCaseProxy<postDriversSignUpUseCases>,

    @Inject(UsecasesProxyModule.POST_DRIVERS_CREATE_USECASE_PROXY)
    private readonly postDriversCreateUseCases: UseCaseProxy<postDriversCreateUseCases>,
  ) {}

  @Post('sign-up')
  @ApiResponseType(DriverSignUpPresenter, true)
  async signUp(@Body() signUpDto: DriverSignUpDto) {

    // User
    let signUpM = new DriverSignUpM();
    signUpM.username = signUpDto.username;
    signUpM.confirmPassword = signUpDto.confirmPassword;
    signUpM.password = signUpDto.password;

    // Profile
    signUpM.firstName = signUpDto.firstName;
    signUpM.lastName = signUpDto.lastName;
    signUpM.phoneNumber = signUpDto.phoneNumber;
    signUpM.email = signUpDto.email;

    const signUpSuccess = await this.postDriversSignUpUseCases.getInstance().execute(signUpM);
    return new DriverSignUpPresenter(signUpSuccess, 'Gracias por registrarse');
  }

  @Post('create')
  @ApiResponseType(DriverPresenter, true)
  async create(@Body() driverDto: DriverDto) {

    let driverM = new DriverM();
    driverM.userId = driverDto.userId;
    driverM.assetId = driverDto.assetId;
    driverM.deviceId = driverDto.deviceId;
    driverM.licenseNumber = driverDto.licenseNumber;

    const result = await this.postDriversCreateUseCases.getInstance().execute(driverM);
    return new DriverPresenter(result, 'Driver updated');

  }
}
