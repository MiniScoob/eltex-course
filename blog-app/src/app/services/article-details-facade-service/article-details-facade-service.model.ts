import { InjectionToken, type Signal } from '@angular/core';

import type { ArticleDetails, CommentRaw, Id } from '../../models';

export interface ArticleDetailsFacade {
  article: Signal<ArticleDetails | null>;
  isLoaded: Signal<boolean>;

  addComment: (comment: CommentRaw) => void;
  updateArticleRating: (rating: number) => void;
  updateCommentRating: (commentId: Id, rating: number) => void;
  loadArticle: (id: Id) => void;
}

export const ARTICLE_DETAILS_FACADE_TOKEN = new InjectionToken<ArticleDetailsFacade>('ArticleDetailsFacade');
