import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import { DatabaseTodoRepository } from './todo.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseProfileRepository } from './profile.repository';
import { Profile } from '../entities/profile.entity';
import { MySQLDriverRepository } from './driver.repository';
import { Driver } from '../entities/driver.entity';
import { TaxiRequestEntity } from '../entities/taxi-request.entity';
import { DatabaseTaxiRequestRepository } from './taxi-request.repository';
import { LocationEntity } from '../entities/location.entity';
import { DatabaseLocationRepository } from './location.repository';


@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Todo, User, Profile, Driver, TaxiRequestEntity, LocationEntity])],
  providers: [DatabaseTodoRepository, DatabaseUserRepository, DatabaseProfileRepository, MySQLDriverRepository, DatabaseTaxiRequestRepository, DatabaseLocationRepository],
  exports: [DatabaseTodoRepository, DatabaseUserRepository, DatabaseProfileRepository, MySQLDriverRepository, DatabaseTaxiRequestRepository, DatabaseLocationRepository],
})
export class RepositoriesModule {}
