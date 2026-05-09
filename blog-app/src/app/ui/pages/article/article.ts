import { Component, computed, inject, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import type {CommentRaw, Id} from '../../../models';
import { toDateString } from '../../../utils';
import { ARTICLE_DETAILS_FACADE_TOKEN } from '../../../services/article-details-facade-service';
import { CommentForm } from '../../containers';
import {ArticleComment, RatingStepper, Spinner} from '../../components';
import { DEFAULT_IMAGE } from './article.constants';

@Component({
  selector: 'app-article',
  imports: [CommentForm, Spinner, ArticleComment, RatingStepper],
  templateUrl: './article.html',
  styleUrl: './article.module.scss',
})
export class Article implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  protected readonly store = inject(ARTICLE_DETAILS_FACADE_TOKEN);

  private readonly articleId: Id | null;

  protected readonly photo = DEFAULT_IMAGE;

  protected createdAt = computed(() => {
    const article = this.store.article();

    return article ? toDateString(new Date(article.createdAt)) : null;
  });

  constructor() {
    this.articleId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.articleId !== null) {
      this.store.loadArticle(this.articleId);
    }
  }

  protected onArticleRatingChange(step: number) {
    this.store.updateArticleRating(step);
  }

  protected onAddComment(value: CommentRaw) {
    console.log('onAddComment');
    this.store.addComment(value);
  }

  protected onCommentRatingChange(id: Id, step: number) {
    this.store.updateCommentRating(id, step);
  }
}
