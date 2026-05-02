import { Injectable, signal } from '@angular/core';

import type { BlogArticleData } from '../../models';
import type { ArticleStore } from './articles-store-service.model';
import { DEFAULT_PAGE } from './articles-store-service.constants';

@Injectable({ providedIn: 'root' })
export class ArticlesStoreService implements ArticleStore {
  private _articles = signal<BlogArticleData[]>([]);
  private _page = signal<number>(DEFAULT_PAGE);
  private _totalArticles = signal<number>(0);
  private _isLoaded = signal<boolean>(false);

  public readonly articles = this._articles.asReadonly();
  public readonly page = this._page.asReadonly();
  public readonly totalArticles = this._totalArticles.asReadonly();
  public readonly isLoaded = this._isLoaded.asReadonly();

  public setArticles(articles: BlogArticleData[]) {
    this._articles.set(articles);
  }

  public setPage(page: number) {
    this._page.set(page);
  }

  public setTotalArticles(totalArticles: number) {
    this._totalArticles.set(totalArticles);
  }

  public setLoaded(isLoaded: boolean) {
    this._isLoaded.set(isLoaded);
  }
}
