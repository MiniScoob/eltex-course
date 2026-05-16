import { InjectionToken, type Signal } from '@angular/core';

import type { ArticlePreview } from '../../models';

export interface ArticlesStore {
  articles: Signal<ArticlePreview[]>;
  page: Signal<number>;
  totalArticles: Signal<number>;
  isLoaded: Signal<boolean>;

  setArticles: (articles: ArticlePreview[]) => void;
  setPage: (page: number) => void;
  setTotalArticles: (totalArticles: number) => void;
  setLoaded: (isLoaded: boolean) => void;
}

export const ARTICLES_STORE_TOKEN = new InjectionToken<ArticlesStore>('ArticlesStore');
