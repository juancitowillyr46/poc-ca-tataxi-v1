import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from 'src/domain/model/user';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DriverM } from 'src/domain/model/drivers/driver';
import { DriverRepository } from 'src/domain/repositories/driverRepository.interface';

export class postDriversCreateUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepo: UserRepository,
    private readonly driverRepo: DriverRepository,
    private readonly exceptionService: ExceptionsService
  ) {}

  async execute(driver: DriverM): Promise<boolean> {

    let success = true;

    const user: UserM = await this.userRepo.getUserById(driver.userId);
    if(user) {
      const resultDrive = await this.driverRepo.createDriver(driver);
      this.logger.log('postDriversCreateUseCases execute', 'Se ha creado los registros del conductor');
    } else {
      this.exceptionService.UnauthorizedException({message: 'Not exist user'});
    }
    
    return success;
  }
}
