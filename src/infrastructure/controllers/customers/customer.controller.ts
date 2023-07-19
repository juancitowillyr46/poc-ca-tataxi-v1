import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';

import { SignUpM } from 'src/domain/model/signup';
import { postCustomersSignUpUseCases } from 'src/usecases/customers/postCustomersSignUpUseCases';
import { SignUpCustomerPresenter } from './customer.presenter';
import { CustomerSignUpDto } from './customer.dto';
import { CustomerSignUpM } from 'src/domain/model/customers/customer-signup';

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
  async signUp(@Body() signUpDto: CustomerSignUpDto) {

    // User
    let signUpM = new CustomerSignUpM();
    signUpM.username = signUpDto.username;
    signUpM.confirmPassword = signUpDto.confirmPassword;
    signUpM.password = signUpDto.password;

    // Profile
    signUpM.firstName = signUpDto.firstName;
    signUpM.lastName = signUpDto.lastName;
    signUpM.phoneNumber = signUpDto.phoneNumber;
    signUpM.email = signUpDto.email;

    const signUpSuccess = await this.postCustomersSignUpUseCases.getInstance().execute(signUpM);
    return new SignUpCustomerPresenter(signUpSuccess, 'Gracias por registrarse');
  }
}
