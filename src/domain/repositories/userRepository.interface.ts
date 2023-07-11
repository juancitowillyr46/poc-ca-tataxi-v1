import { ProfileM } from '../model/profiles/profile';
import { UserM } from '../model/user';

export interface UserRepository {
  getUserByUsername(username: string): Promise<UserM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  createUser(user: UserM): Promise<UserM>;
}
