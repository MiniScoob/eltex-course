import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer, Header } from '../ui/containers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.module.scss',
})
export class App {
  protected readonly title = signal('blog-app');
}
