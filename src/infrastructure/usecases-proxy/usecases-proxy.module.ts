import { DynamicModule, Module } from '@nestjs/common';
import { addTodoUseCases } from '../../usecases/todo/addTodo.usecases';
import { deleteTodoUseCases } from '../../usecases/todo/deleteTodo.usecases';
import { GetTodoUseCases } from '../../usecases/todo/getTodo.usecases';
import { getTodosUseCases } from '../../usecases/todo/getTodos.usecases';
import { updateTodoUseCases } from '../../usecases/todo/updateTodo.usecases';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseTodoRepository } from '../repositories/todo.repository';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { DatabaseProfileRepository } from '../repositories/profile.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { postCustomersSignUpUseCases } from 'src/usecases/customers/postCustomersSignUpUseCases';
import { postDriversSignUpUseCases } from 'src/usecases/drivers/postDriversSignUpUseCases';
import { MySQLDriverRepository } from '../repositories/driver.repository';
import { postDriversCreateUseCases } from 'src/usecases/drivers/postDriversCreateUseCases';
import { DatabaseTaxiRequestRepository } from '../repositories/taxi-request.repository';
import { postCreateTaxiRequestUseCase } from 'src/usecases/taxi-requests/postCreateTaxiRequestUseCase';
import { TaxiRequestRepository } from 'src/domain/repositories/taxi-request-repository.interface';
import { postSearchDriversUseCase } from 'src/usecases/taxi-requests/postSearchDriversUseCase';
import { DatabaseLocationRepository } from '../repositories/location.repository';
import { postUpdateStatusTaxiRequestUseCase } from 'src/usecases/taxi-requests/postUpdateStatusTaxiRequestUseCase';
import { getTaxiRequestUseCase } from 'src/usecases/taxi-requests/getTaxiRequestUseCase';

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  static GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
  static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
  static POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
  static DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
  static PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';

  // Customers
  static POST_CUSTOMERS_SIGN_UP_USECASE_PROXY = 'postCustomersSignUpUseCasesProxy';

  // Drivers
  static POST_DRIVERS_SIGN_UP_USECASE_PROXY = 'postDriversSignUpUseCasesProxy';
  static POST_DRIVERS_CREATE_USECASE_PROXY = 'postDriversCreateUseCasesProxy';

  // Taxi requests
  static POST_TAXI_REQUEST_CREATE_USECASE_PROXY = 'postCreateTaxiRequestUseCase';
  static POST_SEARCH_DRIVER_USECASE_PROXY = 'postSearchDriversUseCase';
  static POST_TAXI_REQUEST_UPDATE_STATUS_PROXY = 'postUpdateStatusTaxiRequest';
  static GET_TAXI_REQUEST_USECASE_PROXY = 'getTaxiRequestUseCase';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODO_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) => new UseCaseProxy(new GetTodoUseCases(todoRepository)),
        },
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) => new UseCaseProxy(new getTodosUseCases(todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.POST_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new addTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new updateTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new deleteTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, DatabaseProfileRepository, ExceptionsService, BcryptService],
          provide: UsecasesProxyModule.POST_CUSTOMERS_SIGN_UP_USECASE_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository, profileRepository: DatabaseProfileRepository, exceptionService: ExceptionsService, bcryptService: BcryptService) =>
            new UseCaseProxy(new postCustomersSignUpUseCases(logger, userRepository, profileRepository, exceptionService, bcryptService)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, DatabaseProfileRepository, ExceptionsService, BcryptService],
          provide: UsecasesProxyModule.POST_DRIVERS_SIGN_UP_USECASE_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository, profileRepository: DatabaseProfileRepository, exceptionService: ExceptionsService, bcryptService: BcryptService) =>
            new UseCaseProxy(new postDriversSignUpUseCases(logger, userRepository, profileRepository, exceptionService, bcryptService)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, DatabaseProfileRepository, ExceptionsService, BcryptService],
          provide: UsecasesProxyModule.POST_DRIVERS_SIGN_UP_USECASE_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository, profileRepository: DatabaseProfileRepository, exceptionService: ExceptionsService, bcryptService: BcryptService) =>
            new UseCaseProxy(new postDriversSignUpUseCases(logger, userRepository, profileRepository, exceptionService, bcryptService)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, MySQLDriverRepository, ExceptionsService],
          provide: UsecasesProxyModule.POST_DRIVERS_CREATE_USECASE_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository, driverRepository: MySQLDriverRepository, exceptionService: ExceptionsService) =>
            new UseCaseProxy(new postDriversCreateUseCases(logger, userRepository, driverRepository, exceptionService)),
        },
        {
          inject: [LoggerService, DatabaseTaxiRequestRepository, MySQLDriverRepository, ExceptionsService],
          provide: UsecasesProxyModule.POST_TAXI_REQUEST_CREATE_USECASE_PROXY,
          useFactory: (logger: LoggerService, taxiRequestRepo: TaxiRequestRepository, mysqlDriverRepository: MySQLDriverRepository, exceptionService: ExceptionsService) =>
            new UseCaseProxy(new postCreateTaxiRequestUseCase(logger, taxiRequestRepo, mysqlDriverRepository, exceptionService)),
        },
        {
          inject: [LoggerService, DatabaseLocationRepository, ExceptionsService],
          provide: UsecasesProxyModule.POST_SEARCH_DRIVER_USECASE_PROXY,
          useFactory: (logger: LoggerService, locationRepository: DatabaseLocationRepository, exceptionService: ExceptionsService) =>
            new UseCaseProxy(new postSearchDriversUseCase(logger, locationRepository, exceptionService)),
        },
        {
          inject: [LoggerService, DatabaseTaxiRequestRepository, ExceptionsService],
          provide: UsecasesProxyModule.POST_TAXI_REQUEST_UPDATE_STATUS_PROXY,
          useFactory: (logger: LoggerService, taxiRequestRepository: DatabaseTaxiRequestRepository, exceptionService: ExceptionsService) =>
            new UseCaseProxy(new postUpdateStatusTaxiRequestUseCase(logger, taxiRequestRepository, exceptionService)),
        },
        {
          inject: [LoggerService, DatabaseTaxiRequestRepository, ExceptionsService],
          provide: UsecasesProxyModule.GET_TAXI_REQUEST_USECASE_PROXY,
          useFactory: (logger: LoggerService, taxiRequestRepository: DatabaseTaxiRequestRepository, exceptionService: ExceptionsService) =>
            new UseCaseProxy(new getTaxiRequestUseCase(logger, taxiRequestRepository, exceptionService)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_TODO_USECASES_PROXY,
        UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
        UsecasesProxyModule.POST_TODO_USECASES_PROXY,
        UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
        UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.POST_CUSTOMERS_SIGN_UP_USECASE_PROXY,
        UsecasesProxyModule.POST_DRIVERS_SIGN_UP_USECASE_PROXY,
        UsecasesProxyModule.POST_DRIVERS_CREATE_USECASE_PROXY,
        UsecasesProxyModule.POST_TAXI_REQUEST_CREATE_USECASE_PROXY,
        UsecasesProxyModule.POST_SEARCH_DRIVER_USECASE_PROXY,
        UsecasesProxyModule.POST_TAXI_REQUEST_UPDATE_STATUS_PROXY,
        UsecasesProxyModule.GET_TAXI_REQUEST_USECASE_PROXY
      ],
    };
  }
}
