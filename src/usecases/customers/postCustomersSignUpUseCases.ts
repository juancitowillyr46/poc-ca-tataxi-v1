import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from 'src/domain/model/user';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { CustomerSignUpM } from 'src/domain/model/customers/customer-signup';
import { Roles } from 'src/domain/enums/roles.enum';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { ProfileRepository } from 'src/domain/repositories/profileRepository.interface';
import { ProfileM } from 'src/domain/model/profiles/profile';

export class postCustomersSignUpUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepo: UserRepository,
    private readonly profileRepo: ProfileRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly bcryptService: BcryptService
  ) {}

  async execute(signUp: CustomerSignUpM): Promise<boolean> {

    let userM = new UserM();
    let success = true;
    let isEqualPws = signUp.validateConfirmPassword(signUp.password, signUp.confirmPassword);
  
    if(!isEqualPws) {
        this.logger.warn('SignUp', `Password is not Equals`);
        success = false;
        this.exceptionService.UnauthorizedException({message: 'Password is not Equals'});
    } else {
      
        userM.username = signUp.username;
        userM.password = await this.bcryptService.hash(signUp.password);
        userM.role = Roles.CUSTOMER;

        const resultUser = await this.userRepo.createUser(userM);

        let profileM = new ProfileM();
        profileM.toProfileM(resultUser.id, signUp);
        
        const resultProfile = await this.profileRepo.createProfile(profileM);

        this.logger.log('signUpCustomerUseCases execute', 'Nuevo usuario cliente');
    }
    
    return success;

  }
}
