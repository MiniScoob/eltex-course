import { InjectionToken, type Signal } from '@angular/core';

import type { BlogArticleData } from '../../models';

export interface Store {
  articles: Signal<BlogArticleData[]>;
  page: Signal<number>;

  setArticles: (articles: BlogArticleData[]) => void;
  setPage: (page: number) => void;
}

export const STORE_TOKEN = new InjectionToken<Store>('Store');
