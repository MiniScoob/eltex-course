import {
  computed,
  DestroyRef,
  inject,
  Injectable,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  catchError,
  EMPTY,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

import type {
  ArticleEvent,
  CommentData,
  CommentRaw,
  Id,
  RatingAction,
} from '../../models';
import { ArticleEventType } from '../../models';
import { buildCategoryMap, enrichWithCategory } from '../../utils';
import { ARTICLE_EVENT_SUBSCRIBER_TOKEN } from '../article-event-subscriber-service';
import { ARTICLES_STORAGE_TOKEN } from '../articles-storage-service';
import { ARTICLE_PAGE_STORE_TOKEN } from '../article-page-store-service';
import { CATEGORIES_FACADE_TOKEN } from '../categories-facade-service';
import { COMMENT_STORAGE_TOKEN } from '../comments-storage-service';
import { GRAPHQL_STORAGE_TOKEN } from '../graphql-storage-service';
import type { ArticlePageFacade } from './article-page-facade-service.model';

@Injectable()
export class ArticlePageFacadeService implements ArticlePageFacade {
  private readonly destroyRef = inject(DestroyRef);

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

  constructor() {
    this.destroyRef.onDestroy(() => {
      const articleId = this.store.article()?.id;
      if (articleId) {
        this.eventSubscriber.unsubscribeFromArticle(articleId);
      }
    });
  }

  public watchForUpdates() {
    const article = this.store.article();

    if (!article) {
      return;
    }

    this.eventSubscriber
      .subscribeToArticle(article.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => EMPTY),
      )
      .subscribe((event) => this.handleEvent(event));
  }

  public addComment(comment: CommentRaw) {
    const articleValue = this.store.article();

    if (!articleValue) {
      return;
    }

    if (this.graphqlStorage) {
      this.graphqlStorage
        .addComment({ ...comment, articleId: articleValue.id })
        .subscribe();

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

    if (this.graphqlStorage) {
      this.graphqlStorage
        .updateArticleRating(articleId, action)
        .subscribe();

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

    if (this.graphqlStorage) {
      this.graphqlStorage
        .updateCommentRating(id, action)
        .subscribe();

      return;
    }

    this.commentsStorage.updateCommentRating(articleId, id, action).subscribe((result) => {
      this.store.setComments(result);
    });
  }

  public load(id: Id) {
    return this
      .loadArticleWithComments(id)
      .pipe(
        tap(() => this.loadCategories()),
        finalize(() => this.store.setLoaded()),
      );
  }

  private handleEvent(event: ArticleEvent) {
    switch (event.type) {
      case ArticleEventType.ArticleRatingChanged: {
        this.store.updateArticle({ rating: event.payload.rating });
        break;
      }
      case ArticleEventType.CommentCreated: {
        const { commentId: id, ...rest } = event.payload;
        this.store.addComment({ ...rest, id });
        break;
      }
      case ArticleEventType.CommentRatingChanged: {
        const { commentId: id, prevRating, ...rest } = event.payload;
        this.store.updateComment(id, rest);
      }
    }
  }

  private loadArticleWithComments(id: Id) {
    if (this.graphqlStorage) {
      return this.loadByGraphql(id);
    }

    return this.loadByRest(id);
  }

  private loadByGraphql(id: Id) {
    return this.graphqlStorage!
      .getArticleWithComments(id)
      .pipe(
        map((result) => {
          if (!result) {
            return null;
          }

          const { comments, ...article } = result;
          return { article, comments };
        }),
        tap((result) => {
          if (result) {
            this.store.setArticle(result.article);
            this.store.setComments(result.comments);
          }
        }),
        map((result) => result?.article ?? null),
      );
  }

  private loadByRest(id: Id) {
    return this.articlesStorage
      .getArticle(id)
      .pipe(
        switchMap((article) => {
          if (!article) {
            return of(null);
          }

          this.store.setArticle(article);

          return this.commentsStorage!.getComments(id).pipe(
            tap((comments) => {
              this.store.setComments(comments);
            }),
            map(() => article)
          );
        }),
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
