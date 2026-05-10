import { Injectable, signal } from '@angular/core';

import type { ArticleDetails, Comment } from '../../models';
import { ArticleDetailsStore } from './article-details-store-service.model';

@Injectable()
export class ArticleDetailsStoreService implements ArticleDetailsStore {
  private _article = signal<ArticleDetails | null>(null);
  private _isLoaded = signal<boolean>(false);

  public readonly article = this._article.asReadonly();
  public readonly isLoaded = this._isLoaded.asReadonly();

  public setArticle(article: ArticleDetails) {
    this._article.set(article);
  }

  public setComments(comments: Comment[]) {
    // const articleValue = this._article();
    //
    // if (!articleValue) {
    //   return;
    // }
    //
    // this._article.set({
    //   ...articleValue,
    //   comments,
    // });
  }

  public setLoaded() {
    if (!this._isLoaded()) {
      this._isLoaded.set(true);
    }
  }
}
