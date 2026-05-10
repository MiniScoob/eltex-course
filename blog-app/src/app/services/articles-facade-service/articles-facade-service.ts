import { inject, Injectable, signal } from '@angular/core';

import type { ArticlePreview, ArticleRaw, Id } from '../../models';
import { ARTICLES_STORAGE_TOKEN, ArticlesStorageResult } from '../articles-storage-service';
import { ARTICLE_STORE_TOKEN } from '../articles-store-service';
import type { ArticlesFacade } from './articles-facade-service.model';
import { DEFAULT_PAGE_SIZE, INITIAL_ARTICLES } from './articles-facade-service.constants';

@Injectable()
export class ArticlesFacadeService implements ArticlesFacade {
  private storage = inject(ARTICLES_STORAGE_TOKEN);
  private store = inject(ARTICLE_STORE_TOKEN);

  private _pageSize = signal<number>(DEFAULT_PAGE_SIZE);
  private _totalComments = signal<number>(0);

  public readonly articles = this.store.articles;
  public readonly page = this.store.page;
  public readonly totalArticles = this.store.totalArticles;
  public readonly totalComments = this._totalComments.asReadonly();
  public readonly pageSize = this._pageSize.asReadonly();
  public readonly isLoaded = this.store.isLoaded;

  public addArticle(value: ArticleRaw) {
    this.storage
      .addArticle(value, this.page(), this.pageSize())
      .subscribe(this.updateStore);
  }

  public updateArticle(id: Id, data: ArticleRaw) {
    this.storage
      .updateArticle(id, data, this.page(), this.pageSize())
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
    this.getComments();

    this.store.setLoaded(true);
  }

  public generateArticles() {
    const generated = Array.from(
      { length: 9 * INITIAL_ARTICLES.length },
      (_, i) => INITIAL_ARTICLES[i % INITIAL_ARTICLES.length]
    );

    generated.forEach((article) => {
      this.storage.addArticle(
        article,
        this.page(),
        this.pageSize()
      );
    });

    this.getArticles();
  }

  public clearArticles() {
    let copy: ArticlePreview[] =[];
    this.storage.getArticles(1, this.totalArticles()).subscribe((result) => {
      copy = [...result.articles];
    });

    copy.forEach((article) => {
      this.storage.deleteArticle(article.id, this.page(), this.pageSize());
    });

    this.getArticles();
  }

  private getArticles() {
    this.storage
      .getArticles(this.page(), this.pageSize())
      .subscribe(this.updateStore);
  }

  private getComments() {
    this.storage
      .getAllComments()
      .subscribe((result) => {
        this._totalComments.set(result.length);
      });
  }

  private updateStore = (data: ArticlesStorageResult) => {
    this.store.setArticles(data.articles);
    this.store.setTotalArticles(data.total);
  }
}
