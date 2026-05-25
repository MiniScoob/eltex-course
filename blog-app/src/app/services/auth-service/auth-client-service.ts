import { computed, inject, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  map,
  type Observable,
  of,
  throwError,
} from 'rxjs';

import type {
  User,
  LoginRequestData,
  RegisterRequestData,
  LocalUser,
} from '../../models';
import { AuthDialog } from '../../ui/containers/auth-dialog/auth-dialog';
import { STORAGE_ENGINE_TOKEN } from '../storage-engine-service';
import type { AuthService } from './auth-service.model';
import { CURRENT_USER_KEY, TOKEN_KEY, USERS_KEY } from './auth-service.constants';

@Injectable()
export class AuthClientService implements AuthService {
  private readonly engine = inject(STORAGE_ENGINE_TOKEN);
  private readonly dialog = inject(MatDialog);

  private readonly _currentUser = signal<User | null>(null);

  public readonly currentUser = this._currentUser.asReadonly();
  public readonly isAuthenticated = computed(() => !!this._currentUser());

  public login(data: LoginRequestData): Observable<User> {
    const users = this.getUsers();
    const exist = users.find((u) =>
      u.username === data.login && u.password === data.password,
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

  public openDialog(): Observable<User | null> {
    return this.dialog.open<AuthDialog, void, User | null>(
        AuthDialog,
        {
          width: '420px',
        },
      )
      .afterClosed()
      .pipe(
        map((result) => result ?? null),
      );
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

  public restoreSession(): Observable<void> {
    const currentUser = this.engine.getItem(CURRENT_USER_KEY);

    if (!currentUser) {
      this.clearSession();
      return of();
    }

    this._currentUser.set(JSON.parse(currentUser));
    return of();
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
