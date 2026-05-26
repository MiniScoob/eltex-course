import {
  Component,
  computed,
  inject,
  type OnDestroy,
  type OnInit,
} from '@angular/core';

import type {
  CommentRaw,
  Id,
  RatingAction,
} from '../../../models';
import { ARTICLE_PAGE_FACADE_TOKEN } from '../../../services/article-page-facade-service';
import { CommentForm } from '../../containers';
import {
  ArticleComment,
  CategoryChips,
  DateTime,
  RatingStepper,
  Spinner,
} from '../../components';
import { DEFAULT_IMAGE } from './article.constants';
import {AUTH_SERVICE_TOKEN} from '../../../services/auth-service';

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
export class Article implements OnDestroy, OnInit {
  private readonly auth = inject(AUTH_SERVICE_TOKEN);
  protected readonly store = inject(ARTICLE_PAGE_FACADE_TOKEN);

  protected readonly photo = computed(() =>
    this.store.article()?.imgSrc ?? DEFAULT_IMAGE,
  );

  protected createdAt = computed(() => {
    const article = this.store.article();

    return article ? article.createdAt : null;
  });

  protected username = computed<string | null>(() => this.auth.currentUser()?.username ?? null);

  public ngOnInit() {
    this.store.watchForUpdates();
  }

  public ngOnDestroy() {
    this.store.stopWatchForUpdates();
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
