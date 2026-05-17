import { Component, input } from '@angular/core';
import { MatChip, MatChipSet } from '@angular/material/chips';

@Component({
  selector: 'category-chips',
  imports: [
    MatChip,
    MatChipSet,
  ],
  templateUrl: './category-chips.html',
  styleUrl: './category-chips.module.scss',
})
export class CategoryChips {
  public readonly categories = input.required<string[]>();
}
