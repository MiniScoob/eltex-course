import { Injectable, signal } from '@angular/core';

import type { ArticleDetails, Comment } from '../../models';
import type { ArticlePageStore } from './article-page-store-service.model';

@Injectable()
export class ArticlePageStoreService implements ArticlePageStore {
  private _article = signal<ArticleDetails | null>(null);
  private _comments = signal<Comment[]>([]);
  private _isLoaded = signal<boolean>(false);

  public readonly article = this._article.asReadonly();
  public readonly comments = this._comments.asReadonly();
  public readonly isLoaded = this._isLoaded.asReadonly();

  public setArticle(article: ArticleDetails) {
    this._article.set(article);
  }

  public setComments(comments: Comment[]) {
    this._comments.set(comments);
  }

  public setLoaded() {
    if (!this._isLoaded()) {
      this._isLoaded.set(true);
    }
  }
}
