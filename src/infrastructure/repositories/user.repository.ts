import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { Status, User } from '../entities/user.entity';
import { ProfileM } from 'src/domain/model/profiles/profile';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }

  async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        username: username,
      },
      { hashRefreshToken: refreshToken },
    );
  }
  async getUserByUsername(username: string): Promise<UserM> {
    const adminUserEntity = await this.userEntityRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!adminUserEntity) {
      return null;
    }
    return this.toUser(adminUserEntity);
  }
  async updateLastLogin(username: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        username: username,
      },
      { lastLogin: () => 'CURRENT_TIMESTAMP' },
    );
  }

  private toUser(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity.id;
    adminUser.username = adminUserEntity.username;
    adminUser.password = adminUserEntity.password;
    adminUser.createdAt = adminUserEntity.createdAt;
    adminUser.updatedAt = adminUserEntity.updatedAt;
    adminUser.lastLogin = adminUserEntity.lastLogin;
    adminUser.hashRefreshToken = adminUserEntity.hashRefreshToken;

    return adminUser;
  }

  private toUserEntity(user: UserM): User {
    const userEntity: User = new User();
    userEntity.username = user.username;
    userEntity.password = user.password;
    userEntity.role = user.role;
    userEntity.status = Status.AVAILABLE;
    userEntity.changePassword = false;
    userEntity.confirmedEmail = true;
    userEntity.createdAt = new Date();
    userEntity.createdBy = 1;
    return userEntity;
  }

  async createUser(user: UserM): Promise<UserM> {
    const userEntity = this.toUserEntity(user);
    const result = await this.userEntityRepository.insert(userEntity);
    return this.toUser(result.generatedMaps[0] as User);
    console.log(result.generatedMaps);
  }

}
