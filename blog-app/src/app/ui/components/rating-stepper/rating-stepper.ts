import {Component, input, output} from '@angular/core';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'rating-stepper',
  imports: [
    MatMiniFabButton,
    MatIcon
  ],
  templateUrl: './rating-stepper.html',
  styleUrl: './rating-stepper.module.scss',
})
export class RatingStepper {
  public value = input.required<number>();

  protected change = output<number>();

  protected handleIncrement() {
    this.change.emit(1);
  }

  protected handleDecrement() {
    this.change.emit(-1);
  }
}
