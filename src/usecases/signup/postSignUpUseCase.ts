import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { SignUpM } from 'src/domain/model/signup';
import { UserM } from 'src/domain/model/user';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { UserType } from 'src/domain/enums/sign-up.enum';

export class postSignUpUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepo: UserRepository,
    private readonly exceptionService: ExceptionsService
  ) {}

  //async execute(signUp: SignUpM, userType: UserType): Promise<boolean> {

    // let userM = new UserM();
    // let success = true;

    // let isEqualPws = signUp.validateConfirmPassword(signUp.password, signUp.confirmPassword);

    // //isEqualPws.then((result) => {
    //   if(!isEqualPws) {
    //     this.logger.warn('SignUp', `Password is not Equals`);
    //     success = false;
    //     this.exceptionService.UnauthorizedException();
    //   } else {
    //     userM.username = signUp.username;
    //     userM.password = signUp.password;
    
    //     this.logger.log('signUpCustomerUseCases execute', 'New user have been inserted');
    //   }
    // //});
    
    // // Login Customer
    // if(userType == UserType.CUSTOMER) {


    // } else if(userType == UserType.DRIVER) {

    // // Login Driver
    // }
    

   
    // return success;
  //}

  // private executeSignIn(signUpM: SignUpM, userType: UserType) {

  // }
}
