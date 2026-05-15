import { inject, Injectable, signal } from '@angular/core';

import { type Observable, switchMap } from 'rxjs';

import type {
  ArticleData,
  ArticlePreview,
  ArticleRaw,
  Id
} from '../../models';
import { CATEGORIES_FACADE_TOKEN } from '../categories-facade-service';
import { ARTICLES_STORAGE_TOKEN, ArticlesStorageResult } from '../articles-storage-service';
import { ARTICLE_STORE_TOKEN } from '../articles-store-service';
import type { ArticlesFacade } from './articles-facade-service.model';
import { DEFAULT_PAGE_SIZE, INITIAL_ARTICLES } from './articles-facade-service.constants';

@Injectable()
export class ArticlesFacadeService implements ArticlesFacade {
  private categoriesStore = inject(CATEGORIES_FACADE_TOKEN);
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
    this.resolveCategoryAndSave(value, (articleData) =>
      this.storage.addArticle(articleData, this.page(), this.pageSize())
    );
  }

  public updateArticle(id: Id, data: ArticleRaw) {
    this.resolveCategoryAndSave(data, (articleData) =>
      this.storage.updateArticle(id, articleData, this.page(), this.pageSize())
    );
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

  private resolveCategoryAndSave(
    value: ArticleRaw,
    save: (enriched: ArticleData) => Observable<ArticlesStorageResult>
  ) {
    const { categoryName, ...rest } = value;

    // Если категория не указана — сразу сохраняем
    if (!categoryName) {
      save({ ...rest, categoryId: null }).subscribe(this.updateStore);
      return;
    }

    this.categoriesStore.resolveCategory(categoryName).pipe(
      switchMap((categoryId) => save({...value, categoryId})),
    ).subscribe(this.updateStore);
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
