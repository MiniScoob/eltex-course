import { Injectable, signal } from '@angular/core';

import type { ArticleDetails, Comment } from '../../models';
import type { ArticlePageStore } from './article-page-store-service.model';

@Injectable()
export class ArticlePageStoreService implements ArticlePageStore {
  private _article = signal<ArticleDetails | null>(null);
  private _comments = signal<Comment[]>([]);
  private _isArticleLoaded = signal<boolean>(false);
  private _isCommentsLoaded = signal<boolean>(false);

  public readonly article = this._article.asReadonly();
  public readonly comments = this._comments.asReadonly();
  public readonly isArticleLoaded = this._isArticleLoaded.asReadonly();
  public readonly isCommentsLoaded = this._isCommentsLoaded.asReadonly();

  public setArticle(article: ArticleDetails) {
    this._article.set(article);
  }

  public setComments(comments: Comment[]) {
    this._comments.set(comments);
  }

  public setArticleLoaded() {
    if (!this._isArticleLoaded()) {
      this._isArticleLoaded.set(true);
    }
  }

  public setCommentsLoaded() {
    if (!this._isCommentsLoaded()) {
      this._isCommentsLoaded.set(true);
    }
  }
}
