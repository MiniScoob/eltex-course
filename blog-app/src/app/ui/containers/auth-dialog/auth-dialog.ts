import {Component, computed, inject, signal} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {AUTH_MODE} from './auth-dialog.constants';
import {AUTH_SERVICE_TOKEN} from '../../../services/auth-service';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {getError} from '../../../utils';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {finalize, Observable, switchMap} from 'rxjs';
import {User} from '../../../models';
import {HttpErrorResponse} from '@angular/common/http';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'auth-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    FormsModule,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCheckbox,
  ],
  templateUrl: './auth-dialog.html',
  styleUrl: './auth-dialog.module.scss',
})
export class AuthDialog {
  private readonly authService = inject(AUTH_SERVICE_TOKEN);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<AuthDialog>);

  protected readonly loginForm = this.formBuilder.group({
    login:    ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected readonly registerForm = this.formBuilder.group({
    email:    ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    isAdmin: [false],
  });

  protected readonly mode = signal<AUTH_MODE>(AUTH_MODE.LOGIN);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly error = signal<string | null>(null);

  protected readonly isLoginMode = computed(() => this.mode() === 'login');
  protected readonly activeForm = computed(() =>
    this.isLoginMode() ? this.loginForm : this.registerForm
  );

  protected onSubmit() {
    if (this.activeForm().invalid) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.dialogRef.disableClose = true;

    const request = this.isLoginMode()
      ? this.handleLogin()
      : this.handleRegister();

    request.pipe(
      finalize(() => {
        this.isLoading.set(false);
        this.dialogRef.disableClose = false;
      }),
    ).subscribe({
      next: (result) => this.dialogRef.close(result),
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  protected handleToggleMode() {
    this.mode.update((prev) => prev === AUTH_MODE.LOGIN
      ? AUTH_MODE.REGISTER
      : AUTH_MODE.LOGIN,
    );

    this.error.set(null);
    this.activeForm().reset();
  }

  protected handleCancel() {
    this.dialogRef.close(null)
  }

  protected getError(
    name: keyof typeof this.registerForm.controls | keyof typeof this.loginForm.controls,
  ) {
    let control;

    if (this.isLoginMode()) {
      control = this.loginForm.get(name);
    } else {
      control = this.registerForm.get(name);
    }

    return getError(control);
  }

  private handleLogin(): Observable<User> {
    const value = {
      login: this.loginForm.value.login ?? '',
      password: this.loginForm.value.password ?? '',
    };

    return this.authService.login(value);
  }

  private handleRegister(): Observable<User> {
    const { email, username, password } = {
      email: this.registerForm.value.email ?? '',
      username: this.registerForm.value.username ?? '',
      password: this.registerForm.value.password ?? '',
    };

    return this.authService
      .register({ email, username, password })
      .pipe(
        switchMap(() => this.authService.login({ login: username, password })),
      );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.error.set('Неверный email или пароль');
    } else if (err.status === 409) {
      this.error.set('Этот email уже зарегистрирован');
    } else {
      this.error.set('Что-то пошло не так. Попробуйте позже');
    }
  }
}
