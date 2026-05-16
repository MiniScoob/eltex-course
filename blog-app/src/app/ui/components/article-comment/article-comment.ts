import { Component, computed, input, output } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';

import type { Comment, RatingAction } from '../../../models';
import { toDateString } from '../../../utils';
import { RatingStepper } from '../rating-stepper';
import { DateTime } from '../date-time';

@Component({
  selector: 'article-comment',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    MatCardFooter,
    RatingStepper,
    DateTime,
  ],
  templateUrl: './article-comment.html',
  styleUrl: './article-comment.module.scss',
})
export class ArticleComment {
  public data = input.required<Comment>();

  protected createdAt = computed(() => toDateString(new Date(this.data().createdAt)));

  public ratingChange = output<RatingAction>();

  protected handleRatingChange(action: RatingAction) {
    this.ratingChange.emit(action);
  }
}
