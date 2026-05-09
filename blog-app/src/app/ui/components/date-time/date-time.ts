import { Component, computed, input } from '@angular/core';

import { toDateString } from '../../../utils';

@Component({
  selector: 'date-time',
  imports: [],
  templateUrl: './date-time.html',
  styleUrl: './date-time.module.scss',
})
export class DateTime {
  public value = input.required<string>();

  protected dateString = computed(() => toDateString(new Date(this.value())));
}
