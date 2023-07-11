import { ProfileM } from "../model/profiles/profile";

export interface ProfileRepository {
  createProfile(profile: ProfileM): Promise<ProfileM>;
  updateProfile(id: number, profile: ProfileM): Promise<ProfileM>;
}
