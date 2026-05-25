import { InjectionToken, type Signal } from '@angular/core';

import type { Observable } from 'rxjs';

import type {
  User,
  LoginRequestData,
  RegisterRequestData,
} from '../../models';

export type RegisterResponse = {
  message: string;
  user: User;
};

export type LoginResponse = {
  access_token: string;
  expires_in: string;
  user: User;
};

export type RefreshTokenResponse = {
  access_token: string;
  expires_in: string;
};

export type AboutUserResponse = User;

export interface AuthService {
  currentUser: Signal<User | null>;
  isAuthenticated: Signal<boolean>;

  login: (data: LoginRequestData) => Observable<User>;
  register: (data: RegisterRequestData) => Observable<User>;
  logout: () => Observable<void>;
  refreshToken: () => Observable<string>;
  getToken: () => string | null;
  restoreSession: () => Observable<void>;
  openDialog: () => Observable<User | null>;
}

export const AUTH_SERVICE_TOKEN = new InjectionToken<AuthService>('AuthService');
