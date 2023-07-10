import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';

import { SignUpM } from 'src/domain/model/sign-up';
import { postCustomersSignUpUseCases } from 'src/usecases/customers/postCustomersSignUpUseCases';
import { SignUpCustomerPresenter } from './customer.presenter';
import { CustomerSignUpDto } from './customer.dto';

@Controller('customers')
@ApiTags('Customers')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(SignUpCustomerPresenter)
export class CustomersController {
  constructor(
    @Inject(UsecasesProxyModule.POST_CUSTOMERS_SIGN_UP_USECASE_PROXY)
    private readonly postCustomersSignUpUseCases: UseCaseProxy<postCustomersSignUpUseCases>,
  ) {}

  @Post('sign-up')
  @ApiResponseType(SignUpCustomerPresenter, true)
  async signUp(@Body() addSignUpDto: CustomerSignUpDto) {

    let signUpM = new SignUpM();
    signUpM.username = addSignUpDto.username;
    signUpM.confirmPassword = addSignUpDto.confirmPassword;
    signUpM.password = addSignUpDto.password;

    const signUpSuccess = await this.postCustomersSignUpUseCases.getInstance().execute(signUpM);
    return new SignUpCustomerPresenter(signUpSuccess);
  }
}
