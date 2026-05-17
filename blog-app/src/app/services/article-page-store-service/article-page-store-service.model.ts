import type { Signal } from '@angular/core';
import { InjectionToken } from '@angular/core';

import type { ArticleDetails, Comment } from '../../models';

export interface ArticlePageStore {
  article: Signal<ArticleDetails | null>;
  comments: Signal<Comment[]>;
  isArticleLoaded: Signal<boolean>;
  isCommentsLoaded: Signal<boolean>;

  setArticle: (article: ArticleDetails) => void;
  setComments: (comments: Comment[]) => void;
  setArticleLoaded: () => void;
  setCommentsLoaded: () => void;
}

export const ARTICLE_PAGE_STORE_TOKEN = new InjectionToken<ArticlePageStore>('ArticlePageStore');
