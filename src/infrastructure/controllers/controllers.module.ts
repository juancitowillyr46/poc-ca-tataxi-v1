import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { TodoController } from './todo/todo.controller';
import { CustomersController } from './customers/customer.controller';
// import { SignUpController } from './security/signup.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [TodoController, AuthController, CustomersController],
})
export class ControllersModule {}
