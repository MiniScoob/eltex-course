import {
  Component,
  computed,
  inject,
  input,
  type OnInit,
} from '@angular/core';

import type {
  ArticleDetails,
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
  protected readonly store = inject(ARTICLE_PAGE_FACADE_TOKEN);

  public article = input<ArticleDetails>();

  protected readonly photo = computed(() =>
    this.store.article()?.imgSrc ?? DEFAULT_IMAGE,
  );

  protected createdAt = computed(() => {
    const article = this.store.article();

    return article ? article.createdAt : null;
  });

  ngOnInit() {
    const article = this.article();
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
