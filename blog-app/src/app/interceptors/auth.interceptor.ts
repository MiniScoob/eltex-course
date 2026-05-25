import {inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {AUTH_SERVICE_TOKEN} from '../services/auth-service';

const AUTH_URLS = ['/auth/login', '/auth/refresh', '/user/register'];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService = inject(AUTH_SERVICE_TOKEN);

  private refreshToken = new BehaviorSubject<string | null>(null)
  private isRefreshing = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthUrl = AUTH_URLS.some(url => req.url.includes(url));
    const token = this.authService.getToken();

    const authReq = (token && !isAuthUrl)
      ? this.setToken(req, token)
      : req;

    return next.handle(authReq)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401 && !isAuthUrl) {
            return this.handle401Error(req, next, err);
          }

          return throwError(() => err);
        })
      )
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler, prevErr: HttpErrorResponse) {
    if (this.isRefreshing) {
      return this.refreshToken.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) =>
          next.handle(this.setToken(req, token)),
        ),
      );
    }

    /* In theory, this option shouldn't get here */
    if (!this.authService.isAuthenticated()) {
      return throwError(() => prevErr);
    }

    this.isRefreshing = true;
    this.refreshToken.next(null)

    return this.authService
      .refreshToken()
      .pipe(
        switchMap((token) => {
          this.isRefreshing = false;
          this.refreshToken.next(token);

          return next.handle(this.setToken(req, token));
        }),
        catchError((err: unknown) => {
          this.isRefreshing = false;
          this.authService.logout();

          return throwError(() => err);
        }),
      );
  }

  private setToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` },
      },
    );
  }
}


