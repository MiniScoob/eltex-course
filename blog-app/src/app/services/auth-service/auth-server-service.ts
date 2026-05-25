import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  catchError,
  map,
  type Observable,
  tap,
  throwError,
} from 'rxjs';

import type {
  LoginRequestData,
  RegisterRequestData,
  User,
} from '../../models';
import { STORAGE_ENGINE_TOKEN } from '../storage-engine-service';
import type {
  AboutUserResponse,
  AuthService,
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
} from './auth-service.model';
import { TOKEN_KEY } from './auth-service.constants';
import {MatDialog} from '@angular/material/dialog';
import {AuthDialog} from '../../ui/containers/auth-dialog/auth-dialog';

@Injectable()
export class AuthServerService implements AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly engine = inject(STORAGE_ENGINE_TOKEN);
  private readonly dialog = inject(MatDialog);

  private readonly _currentUser = signal<User| null>(null);

  public readonly currentUser = this._currentUser.asReadonly();
  public readonly isAuthenticated = computed(() => !!this._currentUser());

  constructor() {
    this.restoreSession();
  }

  public login(data: LoginRequestData): Observable<User> {
    return this.httpClient
      .post<LoginResponse>('api/auth/login', data)
      .pipe(
        tap((result) => {
          this.setToken(result.access_token);
          this._currentUser.set(result.user);
        }),
        map((result) => result.user),
      );
  }

  public register(data: RegisterRequestData): Observable<User> {
    return this.httpClient
      .post<RegisterResponse>('api/users/register', data)
      .pipe(
        map((result) => result.user),
      );
  }

  public logout(): Observable<void> {
    return this.httpClient
      .post<void>('api/auth/logout', null)
      .pipe(
        tap(() => this.clearSession()),
        catchError((err: unknown) => {
          this.clearSession();
          return throwError(() => err);
        }),
      );
  }

  public refreshToken(): Observable<string> {
    return this.httpClient
      .post<RefreshTokenResponse>('api/auth/refresh', null)
      .pipe(
        tap((result) => this.setToken(result.access_token)),
        map((result) => result.access_token),
      );
  }

  public getToken(): string | null {
    return this.engine.getItem(TOKEN_KEY);
  }

  public openDialog(): Observable<User | null> {
    return this.dialog.open<AuthDialog, void, User | null>(
      AuthDialog,
      {
        width: '500px',
      },
      )
      .afterClosed()
      .pipe(
        map((result) => result ?? null),
      );
  }

  private restoreSession(): void {
    const token = this.getToken();

    if (!token) {
      return;
    }

    this.httpClient
      .get<AboutUserResponse>('api/auth/me')
      .pipe(
        tap((result) => this._currentUser.set(result)),
        catchError(() => {
          this.clearSession();
          return throwError(() => null);
        }),
      )
      .subscribe();
  }

  private setToken(token: string): void {
    this.engine.setItem(TOKEN_KEY, token);
  }

  private clearSession() {
    this.engine.removeItem(TOKEN_KEY);
    this._currentUser.set(null);
  }
}
