import { Component } from '@angular/core';

import { NAV_LINKS } from './header.constants';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.module.scss',
})
export class Header {
  protected readonly navLinks = NAV_LINKS;
}
