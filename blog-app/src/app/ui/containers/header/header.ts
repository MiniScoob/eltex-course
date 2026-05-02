import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NAV_LINKS } from './header.constants';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.module.scss',
})
export class Header {
  protected readonly navLinks = NAV_LINKS;
}
