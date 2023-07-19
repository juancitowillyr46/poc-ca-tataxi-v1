import { Roles } from "../enums/roles.enum";

export class UserWithoutPassword {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  hashRefreshToken: string;
  role: Roles;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
