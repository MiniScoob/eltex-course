import { InjectionToken, type Signal } from '@angular/core';

import type { BlogArticleData } from '../../models';

export interface ArticleStore {
  articles: Signal<BlogArticleData[]>;
  page: Signal<number>;
  totalArticles: Signal<number>;
  isLoaded: Signal<boolean>;

  setArticles: (articles: BlogArticleData[]) => void;
  setPage: (page: number) => void;
  setTotalArticles: (totalArticles: number) => void;
  setLoaded: (isLoaded: boolean) => void;
}

export const ARTICLE_STORE_TOKEN = new InjectionToken<ArticleStore>('ArticleStore');
