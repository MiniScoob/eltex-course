import { inject, Injectable } from '@angular/core';

import type { Comment, CommentRaw, Id } from '../../models';
import { ARTICLE_DETAILS_STORAGE_TOKEN } from '../article-details-storage-service';
import { ARTICLE_DETAILS_STORE_TOKEN } from '../article-details-store-service';
import type { ArticleDetailsFacade } from './article-details-facade-service.model';

@Injectable()
export class ArticleDetailsFacadeService implements ArticleDetailsFacade {
  private readonly storage = inject(ARTICLE_DETAILS_STORAGE_TOKEN);
  private readonly store = inject(ARTICLE_DETAILS_STORE_TOKEN);

  public readonly article = this.store.article;
  public readonly isLoaded = this.store.isLoaded;

  public addComment(comment: CommentRaw) {
    const articleValue = this.store.article();

    if (!articleValue) {
      return;
    }

    const value = this.prepareCommentValue(comment);
    this.storage.addComment(articleValue.id, value).subscribe((result) => {
      this.store.setComments(result);
    });
  }

  public updateArticleRating(rating: number) {
    const articleValue = this.store.article();

    if (!articleValue) {
      return;
    }

    this.storage.updateArticleRating(articleValue.id, rating).subscribe((result) => {
      if (result) {
        this.store.setArticle(result);
      }
    });
  }

  public updateCommentRating(id: Id, rating: number) {
    const articleValue = this.store.article();

    if (!articleValue) {
      return;
    }

    this.storage.updateCommentRating(articleValue.id, id, rating).subscribe((result) => {
      this.store.setComments(result);
    });
  }

  public loadArticle(id: Id) {
    this.storage.getArticle(id).subscribe((result) => {
      if (result) {
        this.store.setArticle(result);
      }
      this.store.setLoaded();
    });
  }

  private prepareCommentValue(value: CommentRaw): Comment {
    return {
      ...value,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      rating: 0,
    };
  }
}
