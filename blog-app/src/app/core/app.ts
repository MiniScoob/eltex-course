import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { IconResolver, MatIconRegistry } from '@angular/material/icon';

import { Footer, Header } from '../ui/containers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.module.scss',
})
export class App {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const resolver: IconResolver = (name) => sanitizer
      .bypassSecurityTrustResourceUrl(`/icons/${name}.svg`);
    iconRegistry.addSvgIconResolver(resolver);
  }
}
