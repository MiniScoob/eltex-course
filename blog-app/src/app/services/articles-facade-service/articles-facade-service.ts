import { inject, Injectable, signal } from '@angular/core';

import { type BlogArticleData, BlogArticleRaw, Id } from '../../models';
import { ARTICLES_STORAGE_TOKEN, ArticlesStorageResult } from '../articles-storage-service';
import { ARTICLE_STORE_TOKEN } from '../articles-store-service';
import type { ArticlesFacade } from './articles-facade-service.model';
import { DEFAULT_PAGE_SIZE } from './articles-facade-service.constants';

@Injectable()
export class ArticlesFacadeService implements ArticlesFacade {
  private storage = inject(ARTICLES_STORAGE_TOKEN);
  private store = inject(ARTICLE_STORE_TOKEN);

  private _pageSize = signal<number>(DEFAULT_PAGE_SIZE);

  public readonly articles = this.store.articles;
  public readonly page = this.store.page;
  public readonly totalArticles = this.store.totalArticles;
  public readonly pageSize = this._pageSize.asReadonly();
  public readonly isLoaded = this.store.isLoaded;

  public addArticle(value: BlogArticleRaw) {
    const preparedValue = this.prepareRawValue(value);
    const newBlogArticle = {
      ...preparedValue,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    this.storage
      .addArticle(newBlogArticle, this.page(), this.pageSize())
      .subscribe(this.updateStore);
  }

  public updateArticle(initial: BlogArticleData, data: BlogArticleRaw) {
    const preparedValue = this.prepareRawValue(data);
    const updated = {
      ...initial,
      ...preparedValue,
    };

    this.storage
      .updateArticle(updated, this.page(), this.pageSize())
      .subscribe(this.updateStore);
  }

  public deleteArticle(id: Id) {
    this.storage
      .deleteArticle(id, this.page(), this.pageSize())
      .subscribe(this.updateStore);
  }

  public changePage(page: number) {
    this.store.setPage(page);
    this.getArticles();
  }

  public setPageSize(pageSize: number) {
    this._pageSize.set(pageSize);
    this.getArticles();
  }

  public loadArticles() {
    this.store.setLoaded(false);

    this.getArticles();

    this.store.setLoaded(true);
  }

  private getArticles() {
    this.storage
      .getArticles(this.page(), this.pageSize())
      .subscribe(this.updateStore);
  }

  private prepareRawValue(value: BlogArticleRaw) {
    const { photo, ...rest } = value;

    return rest;
  }

  private updateStore = (data: ArticlesStorageResult) => {
    this.store.setArticles(data.articles);
    this.store.setTotalArticles(data.total);
  }
}
