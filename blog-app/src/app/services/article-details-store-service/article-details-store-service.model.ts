import type { Signal } from '@angular/core';
import { InjectionToken } from '@angular/core';

import type { ArticleDetails, Comment } from '../../models';

export interface ArticleDetailsStore {
  article: Signal<ArticleDetails | null>;
  isLoaded: Signal<boolean>;

  setArticle: (article: ArticleDetails) => void;
  setComments: (comments: Comment[]) => void;
  setLoaded: () => void;
}

export const ARTICLE_DETAILS_STORE_TOKEN = new InjectionToken<ArticleDetailsStore>('ArticleDetailsStore');
