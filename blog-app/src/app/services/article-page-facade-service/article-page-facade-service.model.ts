import { InjectionToken, type Signal } from '@angular/core';

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
  isArticleLoaded: Signal<boolean>;
  isCommentsLoaded: Signal<boolean>;

  addComment: (comment: CommentRaw) => void;
  updateArticleRating: (action: RatingAction) => void;
  updateCommentRating: (commentId: Id, action: RatingAction) => void;
  loadArticle: (id: Id) => void;
  loadComments: () => void;
  setPreloadedArticle: (article: ArticleDetails | null) => void;
}

export const ARTICLE_PAGE_FACADE_TOKEN = new InjectionToken<ArticlePageFacade>('ArticlePageFacade');
