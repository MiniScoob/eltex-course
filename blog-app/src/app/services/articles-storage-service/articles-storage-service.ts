import { inject, Injectable } from '@angular/core';

import { type Observable, of } from 'rxjs';

import type {
  ArticleDetails,
  ArticlePreview,
  ArticleData,
  CommentsStorageData,
  Id,
  RatingAction,
} from '../../models';
import { ARTICLES_STORAGE_KEY, COMMENTS_STORAGE_KEY } from '../../constants';
import { calculateRating } from '../../utils';
import { STORAGE_ENGINE_TOKEN } from '../storage-engine-service';
import type { ArticlesStorage, ArticlesStorageResult } from './articles-storage-service.model';
import { PAGE_SIZE } from './articles-storage-service.constants';

@Injectable()
export class ArticlesStorageService implements ArticlesStorage {
  private engine = inject(STORAGE_ENGINE_TOKEN);

  private readonly _articlesStorageKey = ARTICLES_STORAGE_KEY;
  private readonly _commentsStorageKey = COMMENTS_STORAGE_KEY;

  public addArticle(value: ArticleData, page: number, pageSize?: number) {
    const updated = this.addArticleToStorage(value);
    const result = this.prepareData(updated, page, pageSize);

    return of(result);
  }

  public deleteArticle(id: Id, page: number, pageSize?: number) {
    const updated = this.removeArticlesFromStorage(id);
    const result = this.prepareData(updated, page, pageSize);

    return of(result);
  }

  public updateArticle(id: Id, value: ArticleData, page: number, pageSize?: number) {
    const updated = this.updateArticleInStorage(id, value);
    const result = this.prepareData(updated, page, pageSize);

    return of(result);
  }

  public getArticles(page: number, pageSize?: number) {
    const values = this.getArticlesFromStorage();
    const result = this.prepareData(values, page, pageSize);

    return of(result);
  }

  public getArticle(id: Id) {
    return of(this.getArticleById(id));
  }

  public updateArticleRating(id: Id, action: RatingAction): Observable<ArticleDetails | null> {
    const article = this.getArticleById(id);

    if (!article) {
      return of(null);
    }

    const updated: ArticleDetails = {
      ...article,
      rating: calculateRating(article.rating, action),
    };
    this.updateArticleInStorage(id, updated);

    return of(updated);
  }

  private getArticleById(id: Id) {
    const values = this.getArticlesFromStorage();
    const article = values.find((a) => a.id === id);

    return article ?? null;
  }

  public getAllComments() {
    const values = this.getCommentsFromStorage();

    const result = values.flatMap((item) =>
      item.comments.map((c) => ({ ...c, articleId: item.articleId }))
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

  private addArticleToStorage(value: ArticleData) {
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

  private updateArticleInStorage(id: Id, value: Partial<ArticleData>, updateTimestamp = true) {
    const articles = this.getArticlesFromStorage();
    const updated = articles.map((item) => item.id === id
      ? { ...item, ...value, ...(updateTimestamp && { updatedAt: new Date().toISOString() }), }
      : item
    );

    this.saveArticlesToStorage(updated);

    return updated;
  }

  private createArticle(value: ArticleData): ArticleDetails {
    const date = new Date().toISOString();
    return {
      ...value,
      id: crypto.randomUUID(),
      imgSrc: null,
      rating: 0,
      createdAt: date,
      updatedAt: date,
    };
  }

  private getPreview(value: ArticleDetails): ArticlePreview {
    return {
      id: value.id,
      title: value.title,
      content: value.content,
      imgSrc: value.imgSrc,
      categoryId: value.categoryId,
      createdAt: value.createdAt,
    };
  }

  private getArticlesFromStorage(): ArticleDetails[] {
    const values = this.engine.getItem(this._articlesStorageKey);

    if (!values) {
      return [];
    }

    return JSON.parse(values);
  }

  private saveArticlesToStorage(values: ArticleDetails[]) {
    this.engine.setItem(this._articlesStorageKey, JSON.stringify(values));
  }

  private getCommentsFromStorage(): CommentsStorageData[] {
    const values = this.engine.getItem(this._commentsStorageKey);

    if (!values) {
      return [];
    }

    return JSON.parse(values);
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
