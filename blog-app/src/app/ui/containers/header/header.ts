import { Component } from '@angular/core';

import { NAV_LINKS } from './constants';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.module.scss',
})
export class Header {
  public readonly navLinks = NAV_LINKS;
}
