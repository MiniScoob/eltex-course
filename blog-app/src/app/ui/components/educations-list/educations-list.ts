import { Component, input } from '@angular/core';

import type { Education } from './educations-list.model';

@Component({
  selector: 'home-educations-list',
  imports: [],
  templateUrl: './educations-list.html',
  styleUrl: './educations-list.scss',
})
export class EducationsList {
  public educationItems = input.required<Education[]>();
}
