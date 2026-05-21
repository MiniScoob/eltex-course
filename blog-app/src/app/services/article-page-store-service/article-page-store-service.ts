import { Injectable, signal } from '@angular/core';

import type {ArticleDetails, Comment, Id} from '../../models';
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

  public addComment(comment: Comment) {
    this._comments.update((values) => [...values, comment]);
  }

  public updateArticle(article: Partial<ArticleDetails>) {
    const prevValue = this._article();

    if (!prevValue) {
      return;
    }

    this._article.set({
      ...prevValue,
      ...article,
    });
  }

  public updateComment(id: Id, comment: Partial<Comment>) {
    this._comments.update((values) => values.map((c) => {
      if (c.id === id) {
        return { ...c, ...comment };
      }

      return c;
    }));
  }
}
