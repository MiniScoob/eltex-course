import { Injectable, signal } from '@angular/core';

import type { BlogArticleData } from '../../models';
import type { Store } from './store-service.model';
import { DEFAULT_PAGE } from './store-service.constants';

@Injectable()
export class StoreService implements Store {
  private _articles = signal<BlogArticleData[]>([]);
  private _page = signal<number>(DEFAULT_PAGE);

  public readonly articles = this._articles.asReadonly();
  public readonly page = this._page.asReadonly();

  public setArticles(articles: BlogArticleData[]) {
    this._articles.set(articles);
  }

  public setPage(page: number) {
    this._page.set(page);
  }
}
