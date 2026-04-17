import { Component, input } from '@angular/core';

import { Hobby } from './hobby-card.model';

@Component({
  selector: 'hobby-card',
  imports: [],
  templateUrl: './hobby-card.html',
  styleUrl: './hobby-card.module.scss',
})
export class HobbyCard {
  protected value = input.required<Hobby>();
}
