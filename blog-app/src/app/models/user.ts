import type { Id } from './models';

export type Role = 'user' | 'admin';

export interface UserDetails {
  id: Id;
  username: string;
  email: string;
  createdAt: string;
  lastActiveTime: string;
  isBlocked: boolean;
  role: Role;
}

export type User = Pick<UserDetails, 'id' | 'username' | 'email' | 'role'>;

export type LocalUser = User & {
  password: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

export type RegisterRequestData = {
  username: string;
  password: string;
  email: string;
  isAdmin?: boolean;
};
