import { InjectionToken, type Signal } from '@angular/core';

import type { ArticleDetails, CommentRaw, Id } from '../../models';

export interface ArticleDetailsFacade {
  article: Signal<ArticleDetails | null>;
  isLoaded: Signal<boolean>;

  addComment: (comment: CommentRaw) => void;
  updateArticleRating: (step: number) => void;
  updateCommentRating: (commentId: Id, step: number) => void;
  loadArticle: (id: Id) => void;
  setPreloadedArticle: (article: ArticleDetails | null) => void;
}

export const ARTICLE_DETAILS_FACADE_TOKEN = new InjectionToken<ArticleDetailsFacade>('ArticleDetailsFacade');
