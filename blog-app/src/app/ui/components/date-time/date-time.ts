import { Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'date-time',
  imports: [
    DatePipe,
  ],
  templateUrl: './date-time.html',
  styleUrl: './date-time.module.scss',
})
export class DateTime {
  public value = input.required<string>();

  protected dateValue = computed(() => new Date(this.value()));
}
