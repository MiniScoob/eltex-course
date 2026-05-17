import { Component, computed, inject, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import type { CommentRaw, Id, RatingAction } from '../../../models';
import { toDateString } from '../../../utils';
import { ARTICLE_PAGE_FACADE_TOKEN } from '../../../services/article-page-facade-service';
import { CommentForm } from '../../containers';
import { ArticleComment, CategoryChips, DateTime, RatingStepper, Spinner } from '../../components';
import { DEFAULT_IMAGE } from './article.constants';

@Component({
  selector: 'app-article',
  imports: [
    CategoryChips,
    CommentForm,
    Spinner,
    ArticleComment,
    RatingStepper,
    DateTime,
  ],
  templateUrl: './article.html',
  styleUrl: './article.module.scss',
})
export class Article implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  protected readonly store = inject(ARTICLE_PAGE_FACADE_TOKEN);

  protected readonly photo = computed(() =>
    this.store.article()?.imgSrc ?? DEFAULT_IMAGE,
  );

  protected createdAt = computed(() => {
    const article = this.store.article();

    return article ? toDateString(new Date(article.createdAt)) : null;
  });

  ngOnInit() {
    const article = this.activatedRoute.snapshot.data['article'];
    if (article) {
      this.store.setPreloadedArticle(article);
      this.store.loadComments();
    }
  }

  protected onArticleRatingChange(action: RatingAction) {
    this.store.updateArticleRating(action);
  }

  protected onAddComment(value: CommentRaw) {
    this.store.addComment(value);
  }

  protected onCommentRatingChange(id: Id, action: RatingAction) {
    this.store.updateCommentRating(id, action);
  }
}
