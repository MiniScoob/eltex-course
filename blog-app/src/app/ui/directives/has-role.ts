import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import type { Role } from '../../models';
import { AUTH_SERVICE_TOKEN } from '../../services/auth-service';

@Directive({
  selector: '[hasRole]',
})
export class HasRole {
  private readonly auth = inject(AUTH_SERVICE_TOKEN);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  public readonly hasRole = input.required<Role>();

  constructor() {
    effect(() => {
      const user = this.auth.currentUser();
      this.viewContainerRef.clear();

      if (user && user.role === this.hasRole()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
