import { computed, inject, Injectable } from '@angular/core';

import { map, of, switchMap, tap } from 'rxjs';

import type {
  CommentData,
  CommentRaw,
  Id,
  RatingAction,
} from '../../models';
import { buildCategoryMap, enrichWithCategory } from '../../utils';
import { ARTICLES_STORAGE_TOKEN } from '../articles-storage-service';
import { ARTICLE_PAGE_STORE_TOKEN } from '../article-page-store-service';
import { CATEGORIES_FACADE_TOKEN } from '../categories-facade-service';
import { COMMENT_STORAGE_TOKEN } from '../comments-storage-service';
import { GRAPHQL_STORAGE_TOKEN } from '../graphql-storage-service';
import type { ArticlePageFacade } from './article-page-facade-service.model';
import { ARTICLE_EVENT_SUBSCRIBER_TOKEN } from '../article-event-subscriber-service';

@Injectable()
export class ArticlePageFacadeService implements ArticlePageFacade {
  private readonly eventSubscriber = inject(ARTICLE_EVENT_SUBSCRIBER_TOKEN);
  private readonly articlesStorage = inject(ARTICLES_STORAGE_TOKEN);
  private readonly commentsStorage = inject(COMMENT_STORAGE_TOKEN);
  private readonly graphqlStorage = inject(GRAPHQL_STORAGE_TOKEN, { optional: true });
  private readonly categoriesStore = inject(CATEGORIES_FACADE_TOKEN);
  private readonly store = inject(ARTICLE_PAGE_STORE_TOKEN);

  private readonly categoryMap = computed(() =>
    buildCategoryMap(this.categoriesStore.categories())
  );

  public readonly article = computed(() => {
    const articleValue = this.store.article();

    if (!articleValue) {
      return null;
    }

    return enrichWithCategory(articleValue, this.categoryMap());
  });

  public readonly comments = this.store.comments;
  public readonly isLoaded = this.store.isLoaded;

  public watchForUpdates() {
    const article = this.store.article();

    if (!article) {
      return;
    }

    this.eventSubscriber
      .subscribeToArticle(article.id)
      .subscribe((event) => console.log(event));
  }

  public addComment(comment: CommentRaw) {
    const articleValue = this.store.article();

    if (!articleValue) {
      return;
    }

    const value = this.prepareCommentValue(comment);
    this.commentsStorage.addComment(value).subscribe((result) => {
      this.store.setComments(result);
    });
  }

  public updateArticleRating(action: RatingAction) {
    const articleId = this.store.article()?.id;

    if (!articleId) {
      return;
    }

    this.articlesStorage.updateArticleRating(articleId, action).subscribe((result) => {
      if (result) {
        this.store.setArticle(result);
      }
    });
  }

  public updateCommentRating(id: Id, action: RatingAction) {
    const articleId = this.store.article()?.id;

    if (!articleId) {
      return;
    }

    this.commentsStorage.updateCommentRating(articleId, id, action).subscribe((result) => {
      this.store.setComments(result);
    });
  }

  public load(id: Id) {
    if (this.graphqlStorage) {
      return this.graphqlStorage
        .getArticleWithComments(id)
        .pipe(
          map((result) => {
            if (!result) {
              return null;
            }

            const { comments, ...article } = result.article;
            return { article, comments };
          }),
          tap((result) => {
            if (result) {
              this.store.setArticle(result.article);
              this.store.setComments(result.comments);
              this.loadCategories();
            }

            this.store.setLoaded();
          }),
          map((result) => result?.article ?? null),
        );
    }

    return this.articlesStorage
      .getArticle(id)
      .pipe(
        switchMap((article) => {
          if (!article) {
            return of(null);
          }

          this.store.setArticle(article);
          this.loadCategories();

          return this.commentsStorage!.getComments(id).pipe(
            tap((comments) => {
              this.store.setComments(comments);
            }),
            map(() => article)
          );
        }),
        tap(() => this.store.setLoaded()),
      );
  }

  private loadCategories() {
    if (!this.categoriesStore.isLoaded()) {
      this.categoriesStore.loadCategories();
    }
  };

  private prepareCommentValue(value: CommentRaw): CommentData {
    return {
      ...value,
      articleId: this.article()!.id,
    };
  }
}
