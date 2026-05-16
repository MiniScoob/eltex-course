import { Component, input, output } from '@angular/core';
import { MatMiniFabButton}  from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import type { RatingAction } from '../../../models';

@Component({
  selector: 'rating-stepper',
  imports: [
    MatMiniFabButton,
    MatIcon,
  ],
  templateUrl: './rating-stepper.html',
  styleUrl: './rating-stepper.module.scss',
})
export class RatingStepper {
  public value = input.required<number>();

  protected change = output<RatingAction>();

  protected handleIncrement() {
    this.change.emit('up');
  }

  protected handleDecrement() {
    this.change.emit('down');
  }
}
