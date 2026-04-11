import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../ui/containers/header/header';
import { Footer } from '../ui/containers/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.module.scss',
})
export class App {
  protected readonly title = signal('blog-app');
}
