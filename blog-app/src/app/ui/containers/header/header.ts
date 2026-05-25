import {Component, computed, inject} from '@angular/core';
import { RouterLink } from '@angular/router';

import { NAV_LINKS } from './header.constants';
import {AUTH_SERVICE_TOKEN} from '../../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.module.scss',
})
export class Header {
  private readonly authService = inject(AUTH_SERVICE_TOKEN);

  protected readonly navLinks = NAV_LINKS;

  protected readonly user = computed(() => this.authService.currentUser());

  protected handleAuth() {
    this.authService.openDialog();
  }
}
