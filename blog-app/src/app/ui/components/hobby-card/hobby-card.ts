import { Component, HostBinding, input, } from '@angular/core';

import { Hobby } from './hobby-card.model';

@Component({
  selector: 'hobby-card',
  imports: [],
  templateUrl: './hobby-card.html',
  styleUrl: './hobby-card.module.scss',
  host: {
    '[class.hobby-card]': 'true',
  },
})
export class HobbyCard {
  // @HostBinding('class') hostClass = 'hobby-card';

  public value = input.required<Hobby>();
}
