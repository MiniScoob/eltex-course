import { inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import type { ArticleDetails, Comment, CommentData, CommentsStorageData, Id } from '../../models';
import { ARTICLES_STORAGE_KEY, COMMENTS_STORAGE_KEY } from '../../constants';
import { STORAGE_ENGINE_TOKEN } from '../storage-engine-service';
import type { ArticleDetailsStorage } from './article-details-storage-service.model';

@Injectable()
export class ArticleDetailsStorageService implements ArticleDetailsStorage {
  private readonly engine = inject(STORAGE_ENGINE_TOKEN);

  private readonly _articlesStorageKey = ARTICLES_STORAGE_KEY;
  private readonly _commentsStorageKey = COMMENTS_STORAGE_KEY;

  public getArticle(id: Id) {
    return of(this.getArticleById(id));
  }

  public getComments(id: Id) {
    return of(this.getCommentsByArticleId(id));
  }

  public addComment(data: CommentData): Observable<Comment[]> {
    const value = this.prepareComment(data);
    this.saveComment(value);

    return of(this.getCommentsByArticleId(data.articleId));
  }

  public updateArticleRating(id: Id, step: number): Observable<ArticleDetails | null> {
    const article = this.getArticleById(id);

    if (!article) {
      return of(null);
    }

    const updated: ArticleDetails = {
      ...article,
      rating: article.rating + step,
    };
    this.saveArticle(updated);

    return of(updated);
  }

  public updateCommentRating(articleId: Id, id: Id, step: number): Observable<Comment[]> {
    const comments = this.getCommentsByArticleId(articleId);

    if (!comments) {
      return of([]);
    }

    let value = comments.find((comment) => comment.id === id);

    if (!value) {
      return of([]);
    }

    const updated: Comment = {
      ...value,
      rating: value.rating + step,
    };
    this.saveComment(updated);

    return of(this.getCommentsByArticleId(articleId));
  }

  private saveArticle(value: ArticleDetails) {
    const articles = this.getAllArticlesFromStorage();

    const updated = articles.map((a) => a.id === value.id
      ? { ...a, ...value }
      : a,
    );

    this.saveArticlesToStorage(updated);
  }

  private prepareComment(value: CommentData): Comment {
    return {
      ...value,
      id: crypto.randomUUID(),
      rating: 0,
      createdAt: new Date().toISOString(),
    }
  }

  private saveComment(value: Comment) {
    const data = this.getAllCommentsFromStorage();
    const groupExists = data.some((d) => d.articleId === value.articleId);

    const updated = groupExists
      ? data.map((d) => {
        if (d.articleId !== value.articleId) {
          return d;
        }

        const commentExists = d.comments.some((c) => c.id === value.id);
        const comments = commentExists
          ? d.comments.map((c) => (c.id === value.id ? value : c))
          : [...d.comments, value];
        return { ...d, comments };
      })
      : [...data, { articleId: value.articleId, comments: [value] }];

    this.saveCommentsToStorage(updated);
  }

  private getArticleById(id: Id) {
    const values = this.getAllArticlesFromStorage();
    const article = values.find((a) => a.id === id);

    return article ?? null;
  }

  private getAllArticlesFromStorage(): ArticleDetails[] {
    const values = this.engine.getItem(this._articlesStorageKey);

    if (!values) {
      return [];
    }

    return JSON.parse(values);
  }

  private saveArticlesToStorage(values: ArticleDetails[]) {
    this.engine.setItem(this._articlesStorageKey, JSON.stringify(values));
  }

  private getCommentsByArticleId(id: Id) {
    const values = this.getAllCommentsFromStorage();

    const data = values.find((v) => v.articleId === id);

    if (!data) {
      return [];
    }

    return data.comments.map((c) => ({ ...c, articleId: data.articleId }));
  }

  private getAllCommentsFromStorage(): CommentsStorageData[]  {
    const values = this.engine.getItem(this._commentsStorageKey);

    if (!values) {
      return [];
    }

    return JSON.parse(values);
  }

  private saveCommentsToStorage(values: CommentsStorageData[]) {
    this.engine.setItem(this._commentsStorageKey, JSON.stringify(values));
  }
}
