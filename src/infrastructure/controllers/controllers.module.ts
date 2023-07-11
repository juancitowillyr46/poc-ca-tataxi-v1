import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { TodoController } from './todo/todo.controller';
import { CustomersController } from './customers/customer.controller';
import { DriversController } from './drivers/drivers.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, CustomersController, DriversController],
})
export class ControllersModule {}
