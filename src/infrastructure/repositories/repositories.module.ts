import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import { DatabaseTodoRepository } from './todo.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseProfileRepository } from './profile.repository';
import { Profile } from '../entities/profile.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Todo, User, Profile])],
  providers: [DatabaseTodoRepository, DatabaseUserRepository, DatabaseProfileRepository],
  exports: [DatabaseTodoRepository, DatabaseUserRepository, DatabaseProfileRepository],
})
export class RepositoriesModule {}
