import { inject, Injectable } from '@angular/core';

import type {
  ArticleDetails,
  Comment,
  CommentData,
  CommentRaw,
  Id,
  RatingAction,
} from '../../models';
import { ARTICLES_STORAGE_TOKEN } from '../articles-storage-service';
import { ARTICLE_PAGE_STORE_TOKEN } from '../article-page-store-service';
import { COMMENT_STORAGE_TOKEN } from '../comments-storage-service';
import type { ArticlePageFacade } from './article-page-facade-service.model';

@Injectable()
export class ArticlePageFacadeService implements ArticlePageFacade {
  private readonly articlesStorage = inject(ARTICLES_STORAGE_TOKEN);
  private readonly commentsStorage = inject(COMMENT_STORAGE_TOKEN);
  private readonly store = inject(ARTICLE_PAGE_STORE_TOKEN);

  public readonly article = this.store.article;
  public readonly comments = this.store.comments;
  public readonly isArticleLoaded = this.store.isArticleLoaded;
  public readonly isCommentsLoaded = this.store.isCommentsLoaded;

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
      console.log(result);
      this.store.setComments(result);
    });
  }

  public loadArticle(id: Id) {
    this.articlesStorage.getArticle(id).subscribe((result) => {
      if (result) {
        this.store.setArticle(result);
      }

    });
  }

  public loadComments() {
    const articleId = this.article()?.id;

    if (!articleId) {
      return;
    }

    this.commentsStorage.getComments(articleId).subscribe((result) => {
      this.store.setComments(result);
      this.store.setCommentsLoaded();
    });
  }

  public setPreloadedArticle(article: ArticleDetails | null) {
    if (article) {
      this.store.setArticle(article);
    }
    this.store.setArticleLoaded();
  }

  private prepareCommentValue(value: CommentRaw): CommentData {
    return {
      ...value,
      articleId: this.article()!.id,
    };
  }
}
