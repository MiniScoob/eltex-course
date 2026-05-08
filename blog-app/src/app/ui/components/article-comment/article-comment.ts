import { Component, computed, input } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';

import type { Comment } from '../../../models';
import { toDateString } from '../../../utils';

@Component({
  selector: 'article-comment',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle
  ],
  templateUrl: './article-comment.html',
  styleUrl: './article-comment.module.scss',
})
export class ArticleComment {
  public data = input.required<Comment>();

  protected createdAt = computed(() => toDateString(new Date(this.data().createdAt)));
}
