import type { Signal } from '@angular/core';
import { InjectionToken } from '@angular/core';

import type { ArticleDetails, Comment } from '../../models';

export interface ArticlePageStore {
  article: Signal<ArticleDetails | null>;
  comments: Signal<Comment[]>;
  isLoaded: Signal<boolean>;

  setArticle: (article: ArticleDetails) => void;
  setComments: (comments: Comment[]) => void;
  setLoaded: () => void;
}

export const ARTICLE_PAGE_STORE_TOKEN = new InjectionToken<ArticlePageStore>('ArticlePageStore');
