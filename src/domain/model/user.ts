export class UserWithoutPassword {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  hashRefreshToken: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
