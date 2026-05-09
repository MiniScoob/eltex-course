import { inject, Injectable } from '@angular/core';

import { of } from 'rxjs';

import type { ArticleDetails, ArticlePreview, Comment, Id } from '../../models';
import { STORAGE_ENGINE_TOKEN } from '../storage-engine-service';
import type { ArticlesStorage, ArticlesStorageResult } from './articles-storage-service.model';
import { PAGE_SIZE, STORAGE_KEY } from './articles-storage-service.constants';

@Injectable({ providedIn: 'root' })
export class ArticlesStorageService implements ArticlesStorage {
  private engine = inject(STORAGE_ENGINE_TOKEN);

  private readonly _storageKey = STORAGE_KEY;

  public addArticle(value: ArticlePreview, page: number, pageSize?: number) {
    const updated = this.addArticleToStorage(value);
    const result = this.prepareData(updated, page, pageSize);

    return of(result);
  }

  public deleteArticle(id: Id, page: number, pageSize?: number) {
    const updated = this.removeArticlesFromStorage(id);
    const result = this.prepareData(updated, page, pageSize);

    return of(result);
  }

  public updateArticle(value: ArticlePreview, page: number, pageSize?: number) {
    const updated = this.updateArticleInStorage(value);
    const result = this.prepareData(updated, page, pageSize);

    return of(result);
  }

  public getArticles(page: number, pageSize?: number) {
    const values = this.getArticlesFromStorage();
    const result = this.prepareData(values, page, pageSize);

    return of(result);
  }

  public getAllComments() {
    const values = this.getArticlesFromStorage();
    const result = values.reduce((acc, item) =>
      [...acc, ...item.comments],
      [] as Comment[],
    );

    return of(result);
  }

  private prepareData(values: ArticleDetails[], page: number, pageSize = PAGE_SIZE): ArticlesStorageResult {
    const totalPages = Math.ceil(values.length / pageSize);
    const realPage = this.getRealPage(page, totalPages);
    const articles = values.slice((realPage - 1) * pageSize, realPage * pageSize).map(this.getPreview);

    return {
      articles,
      total: values.length,
    };
  }

  private addArticleToStorage(value: ArticlePreview) {
    const newArticle = this.createArticle(value);
    const articles = this.getArticlesFromStorage();
    const updated = [newArticle, ...articles];

    this.saveArticlesToStorage(updated);

    return updated;
  }

  private removeArticlesFromStorage(id: Id) {
    const articles = this.getArticlesFromStorage();
    const updated = articles.filter((item) => item.id !== id);

    this.saveArticlesToStorage(updated);

    return updated;
  }

  private updateArticleInStorage(value: ArticlePreview) {
    const articles = this.getArticlesFromStorage();
    const updated = articles.map((item) => item.id === value.id
      ? { ...item, ...value }
      : item
    );

    this.saveArticlesToStorage(updated);

    return updated;
  }

  private createArticle(value: ArticlePreview) {
    return {
      ...value,
      rating: 0,
      comments: [],
    };
  }

  private getPreview(value: ArticleDetails): ArticlePreview {
    return {
      id: value.id,
      title: value.title,
      text: value.text,
      createdAt: value.createdAt,
    };
  }

  private getArticlesFromStorage(): ArticleDetails[] {
    const values = this.engine.getItem(this._storageKey);

    if (!values) {
      return [];
    }

    return JSON.parse(values);
  }

  private saveArticlesToStorage(values: ArticleDetails[]) {
    this.engine.setItem(this._storageKey, JSON.stringify(values));
  }

  private getRealPage(page: number, totalPages: number) {
    if (page <= 0 ) {
      return 1;
    }

    if (page > totalPages) {
      return totalPages;
    }

    return page;
  }
}
