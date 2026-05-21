import { InjectionToken, type Signal } from '@angular/core';

import type { Observable } from 'rxjs';

import type {
  ArticleDetails,
  Comment,
  CommentRaw,
  Id,
  RatingAction,
} from '../../models';

type ArticleDetailsWithCategoryName = ArticleDetails & {
  categoryName: string | null;
};

export interface ArticlePageFacade {
  article: Signal<ArticleDetailsWithCategoryName | null>;
  comments: Signal<Comment[]>;
  isLoaded: Signal<boolean>;

  watchForUpdates: () => void;
  addComment: (comment: CommentRaw) => void;
  updateArticleRating: (action: RatingAction) => void;
  updateCommentRating: (commentId: Id, action: RatingAction) => void;
  load: (id: Id) => Observable<ArticleDetails | null>;
}

export const ARTICLE_PAGE_FACADE_TOKEN = new InjectionToken<ArticlePageFacade>('ArticlePageFacade');
