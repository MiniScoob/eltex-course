import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Home } from '../ui/pages/home/home';
import { Header } from '../ui/containers/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Home],
  templateUrl: './app.html',
  styleUrl: './app.module.scss',
})
export class App {
  protected readonly title = signal('blog-app');
}
