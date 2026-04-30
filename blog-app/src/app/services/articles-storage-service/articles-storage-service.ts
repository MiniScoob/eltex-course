import { inject, Injectable } from '@angular/core';

import { of } from 'rxjs';

import type { BlogArticleData, Id } from '../../models';
import { STORAGE_ENGINE_TOKEN } from '../storage-engine-service';
import type { ArticlesStorage, ArticlesStorageResult } from './articles-storage-service.model';
import { PAGE_SIZE, STORAGE_KEY } from './articles-storage-service.constants';

@Injectable()
export class ArticlesStorageService implements ArticlesStorage {
  private engine = inject(STORAGE_ENGINE_TOKEN);

  private readonly _storageKey = STORAGE_KEY;

  public addArticle(value: BlogArticleData, page: number) {
    const updated = this.addArticleToStorage(value);
    const result = this.prepareData(updated, page);

    return of(result);
  }

  public deleteArticle(id: Id, page: number) {
    const updated = this.removeArticlesFromStorage(id);
    const result = this.prepareData(updated, page);

    return of(result);
  }

  public updateArticle(value: BlogArticleData, page: number) {
    const updated = this.updateArticleInStorage(value);
    const result = this.prepareData(updated, page);

    return of(result);
  }

  public getArticles(page: number) {
    const values = this.getArticlesFromStorage();
    const result = this.prepareData(values, page);

    return of(result);
  }

  private prepareData(values: BlogArticleData[], page: number, pageSize = PAGE_SIZE): ArticlesStorageResult {
    const articles = values.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(values.length / pageSize);

    return {
      articles,
      total: values.length,
      totalPages,
    };
  }

  private addArticleToStorage(value: BlogArticleData) {
    const articles = this.getArticlesFromStorage();
    const updated = [value, ...articles];

    this.saveArticlesToStorage(updated);

    return updated;
  }

  private removeArticlesFromStorage(id: Id) {
    const articles = this.getArticlesFromStorage();
    const updated = articles.filter((item) => item.id !== id);

    this.saveArticlesToStorage(updated);

    return updated;
  }

  private updateArticleInStorage(value: BlogArticleData) {
    const articles = this.getArticlesFromStorage();
    const updated = articles.map((item) => item.id === value.id ? value : item);

    this.saveArticlesToStorage(updated);

    return updated;
  }

  private getArticlesFromStorage() {
    const values = this.engine.getItem(this._storageKey);

    if (!values) {
      return [];
    }

    return JSON.parse(values) as BlogArticleData[];
  }

  private saveArticlesToStorage(values: BlogArticleData[]) {
    this.engine.setItem(this._storageKey, JSON.stringify(values));
  }
}
