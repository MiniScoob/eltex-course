import { Injectable } from '@angular/core';

import { of } from 'rxjs';

import type { BlogArticleData, Id } from '../../models';
import type { ArticlesStorage, ArticlesStorageResult } from './articles-storage-service.model';
import { PAGE_SIZE, STORAGE_KEY } from './articles-storage-service.constants';

@Injectable()
export class ArticlesStorageService implements ArticlesStorage {
  private readonly _storageKey = STORAGE_KEY;

  public addArticle(value: BlogArticleData, page: number) {
    const updated = this.addArticleToLocalStorage(value);
    const result = this.prepareData(updated, page);

    return of(result);
  }

  public deleteArticle(id: Id, page: number) {
    const updated = this.removeArticlesFromLocalStorage(id);
    const result = this.prepareData(updated, page);

    return of(result);
  }

  public updateArticle(value: BlogArticleData, page: number) {
    const updated = this.updateArticleInLocalStorage(value);
    const result = this.prepareData(updated, page);

    return of(result);
  }

  public getArticles(page: number) {
    const values = this.getArticlesFromLocalStorage();
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

  private addArticleToLocalStorage(value: BlogArticleData) {
    const articles = this.getArticlesFromLocalStorage();
    const updated = [value, ...articles];

    this.saveArticlesToLocalStorage(updated);

    return updated;
  }

  private removeArticlesFromLocalStorage(id: Id) {
    const articles = this.getArticlesFromLocalStorage();
    const updated = articles.filter((item) => item.id !== id);

    this.saveArticlesToLocalStorage(updated);

    return updated;
  }

  private updateArticleInLocalStorage(value: BlogArticleData) {
    const articles = this.getArticlesFromLocalStorage();
    const updated = articles.map((item) => item.id === value.id ? value : item);

    this.saveArticlesToLocalStorage(updated);

    return updated;
  }

  private getArticlesFromLocalStorage() {
    const values = localStorage.getItem(this._storageKey);

    if (!values) {
      return [];
    }

    return JSON.parse(values) as BlogArticleData[];
  }

  private saveArticlesToLocalStorage(values: BlogArticleData[]) {
    localStorage.setItem(this._storageKey, JSON.stringify(values));
  }
}
