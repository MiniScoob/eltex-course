import { InjectionToken, type Signal } from '@angular/core';

import type {
  ArticleRaw,
  ArticlePreview,
  Id,
  Category
} from '../../models';

export interface BlogFacade {
  articles: Signal<ArticlePreview[]>;
  categories: Signal<Category[]>;
  page: Signal<number>;
  totalArticles: Signal<number>;
  totalComments: Signal<number>;
  pageSize: Signal<number>;
  isLoaded: Signal<boolean>;

  addArticle: (value: ArticleRaw) => void;
  deleteArticle: (id: Id) => void;
  updateArticle: (id: Id, data: ArticleRaw) => void;
  getArticleFormData: (article: ArticlePreview) => ArticleRaw;
  changePage: (page: number) => void;
  setPageSize: (page: number) => void;
  load: () => void;

  // for testing purposes
  generateArticles: () => void;
  clearArticles: () => void;
}

export const BLOG_FACADE_TOKEN = new InjectionToken<BlogFacade>('BlogFacade')
