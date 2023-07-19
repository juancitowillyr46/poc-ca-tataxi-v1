import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserM } from '../../domain/model/user';
import { Status, User } from '../entities/user.entity';
import { ProfileRepository } from 'src/domain/repositories/profileRepository.interface';
import { ProfileM } from 'src/domain/model/profiles/profile';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class DatabaseProfileRepository implements ProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileEntityRepository: Repository<Profile>,
  ) {}

    async createProfile(profile: ProfileM): Promise<ProfileM> {
      const profileEntity = this.toProfileEntity(profile);
      profileEntity.createdAt = new Date();
      profileEntity.createdBy = profile.userId;
      const result = await this.profileEntityRepository.insert(profileEntity);
      return this.toProfile(result.generatedMaps[0] as Profile);
    }

    async updateProfile(id: number, profile: ProfileM): Promise<ProfileM> {
        const profileEntity = this.toProfileEntity(profile);
        profileEntity.updatedAt = new Date();
        const result = await this.profileEntityRepository.update({id: id}, profileEntity);
        return this.toProfile(result.generatedMaps[0] as Profile);
    }

    private toProfile(profileEntity: Profile): ProfileM {
        const profile: ProfileM = new ProfileM();
        profile.firstName = profileEntity.firstName;
        profile.lastName = profileEntity.lastName;
        profile.phoneNumber = profileEntity.phoneNumber;
        profile.email = profileEntity.email;
        profile.photo = profileEntity.photo;
        return profile;
    }

    private toProfileEntity(profile: ProfileM): Profile {

        const profileEntity = new Profile();
        profileEntity.firstName = profile.firstName;
        profileEntity.lastName = profile.lastName;
        profileEntity.email = profile.email;
        profileEntity.phoneNumber = profile.phoneNumber;
        profileEntity.photo = profile.photo;
        profileEntity.userId = profile.userId;
        return profileEntity;
    }

}
