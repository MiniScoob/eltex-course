import { computed, inject, Injectable, signal } from '@angular/core';

import { type Observable, of, throwError } from 'rxjs';

import type {
  User,
  LoginRequestData,
  RegisterRequestData,
  LocalUser,
} from '../../models';
import { STORAGE_ENGINE_TOKEN } from '../storage-engine-service';
import type { AuthService } from './auth-service.model';
import { CURRENT_USER_KEY, TOKEN_KEY, USERS_KEY } from './auth-service.constants';

@Injectable()
export class AuthClientService implements AuthService {
  private readonly engine = inject(STORAGE_ENGINE_TOKEN);

  private readonly _currentUser = signal<User | null>(null);

  public readonly currentUser = this._currentUser.asReadonly();
  public readonly isAuthenticated = computed(() => !!this._currentUser());

  constructor() {
    this.restoreSession();
  }

  public login(data: LoginRequestData): Observable<User> {
    const users = this.getUsers();
    const exist = users.find((u) =>
      u.username === data.username && u.password === data.password,
    );

    if (!exist) {
      return throwError(() => ({
        status: 401, message: 'Неверный логин или пароль',
      }));
    }

    const { password, ...user } = exist;
    this.setToken(this.mockToken());
    this.setCurrentUser(user);

    return of(user);
  }

  register(data: RegisterRequestData): Observable<User> {
    const users = this.getUsers();

    const exist = users.some((u) =>
      u.username === data.username || u.email === data.email,
    );

    if (exist) {
      return throwError(() => ({
        status: 409,
        message: 'Пользователь с таким именем или email уже существует',
      }));
    }

    const { isAdmin, ...rest } = data;

    const newUser: LocalUser = {
      ...rest,
      id: crypto.randomUUID(),
      role: data.isAdmin ? 'admin' : 'user',
    };

    this.saveUsers([newUser, ...users]);

    const { password, ...user } = newUser;

    return of(user);
  }

  logout(): Observable<void> {
    this.clearSession();

    return of();
  }

  refreshToken(): Observable<string> {
    if (!this.getToken()) {
      return throwError(() => ({
        status: 401,
        message: 'Пользователь не авторизован',
      }));
    }

    const newToken = this.mockToken();
    this.setToken(newToken);

    return of(newToken);
  }

  getToken(): string | null {
    return this.engine.getItem(TOKEN_KEY);
  }

  private getUsers(): LocalUser[] {
    const values = this.engine.getItem(USERS_KEY);
    return values ? JSON.parse(values) : [];
  }

  private saveUsers(users: LocalUser[]) {
    this.engine.setItem(USERS_KEY, JSON.stringify(users));
  }

  private setCurrentUser(user: User) {
    this.engine.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    this._currentUser.set(user);
  }

  private setToken(token: string) {
    this.engine.setItem(TOKEN_KEY, token);
  }

  private restoreSession() {
    const currentUser = this.engine.getItem(CURRENT_USER_KEY);

    if (!currentUser) {
      this.clearSession();
      return;
    }

    this._currentUser.set(JSON.parse(currentUser));
  }

  private clearSession() {
    this.engine.removeItem(CURRENT_USER_KEY);
    this.engine.removeItem(TOKEN_KEY);
    this._currentUser.set(null);
  }

  private mockToken(): string {
    return crypto.randomUUID();
  }
}
