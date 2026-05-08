import { inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import type { ArticleDetails, Comment, Id } from '../../models';
import { STORAGE_ENGINE_TOKEN } from '../storage-engine-service';
import type { ArticleDetailsStorage } from './article-details-storage-service.model';

@Injectable()
export class ArticleDetailsStorageService implements ArticleDetailsStorage {
  private readonly engine = inject(STORAGE_ENGINE_TOKEN);

  private readonly _storageKey = 'articles';

  public getArticle(id: Id) {
    return of(this.getArticleById(id));
  }

  public addComment(articleId: Id, data: Comment): Observable<Comment[]> {
    const article = this.getArticleById(articleId);

    if (!article) {
      return of([]);
    }

    const comments = [...article.comments, data];

    const updated: ArticleDetails = {
      ...article,
      comments,
    };
    this.saveArticle(updated);

    return of(comments);
  }

  public updateArticleRating(id: Id, rating: number): Observable<ArticleDetails | null> {
    const article = this.getArticleById(id);

    if (!article) {
      return of(null);
    }

    const updated: ArticleDetails = {
      ...article,
      rating,
    };
    this.saveArticle(updated);

    return of(updated);
  }

  public updateCommentRating(articleId: Id, id: Id, rating: number): Observable<Comment[]> {
    const article = this.getArticleById(articleId);

    if (!article) {
      return of([]);
    }

    const comments = article.comments.map((value) => value.id === id
      ? { ...value, rating }
      : value,
    );

    const updated: ArticleDetails = {
      ...article,
      comments,
    };
    this.saveArticle(updated);

    return of(comments);
  }

  private saveArticle(value: ArticleDetails) {
    const articles = this.getAllArticlesFromStorage();

    const updated = articles.map((a) => a.id === value.id
      ? { ...a, ...value }
      : a,
    );

    this.saveArticlesToStorage(updated);
  }

  private getArticleById(id: Id) {
    const values = this.getAllArticlesFromStorage();

    if (values.length === 0) {
      return null;
    }

    const article = values.find((a) => a.id === id);

    return article ?? null;
  }

  private getAllArticlesFromStorage() {
    const values = this.engine.getItem(this._storageKey);

    if (!values) {
      return [];
    }

    return JSON.parse(values) as ArticleDetails[];
  }

  private saveArticlesToStorage(values: ArticleDetails[]) {
    this.engine.setItem(this._storageKey, JSON.stringify(values));
  }
}
