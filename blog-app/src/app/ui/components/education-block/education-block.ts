import { Component, input } from '@angular/core';

import type { Education } from './education-block.model';

@Component({
  selector: 'home-education-block',
  imports: [],
  templateUrl: './education-block.html',
  styleUrl: './education-block.scss',
})
export class EducationBlock {
  public educationItems = input.required<Education[]>();
}
