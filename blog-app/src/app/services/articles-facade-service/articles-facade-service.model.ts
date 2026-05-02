import { InjectionToken, type Signal } from '@angular/core';

import type { BlogArticleData, BlogArticleRaw, Id } from '../../models';

export interface ArticlesFacade {
  articles: Signal<BlogArticleData[]>;
  page: Signal<number>;
  totalArticles: Signal<number>;
  pageSize: Signal<number>;
  isLoaded: Signal<boolean>;

  addArticle: (value: BlogArticleRaw) => void;
  deleteArticle: (id: Id) => void;
  updateArticle: (initial: BlogArticleData, data: BlogArticleRaw) => void;
  changePage: (page: number) => void;
  setPageSize: (page: number) => void;
  loadArticles: () => void;

  // for testing purposes
  generateArticles: () => void;
  clearArticles: () => void;
}

export const ARTICLES_FACADE_TOKEN = new InjectionToken<ArticlesFacade>('ArticlesFacade')
