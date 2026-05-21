import { Routes } from '@angular/router';

import { ARTICLE_EVENT_SUBSCRIBER_TOKEN, ArticleEventSubscriberService } from '../services/article-event-subscriber-service';
import { ARTICLE_PAGE_STORE_TOKEN, ArticlePageStoreService } from '../services/article-page-store-service';
import { ARTICLE_PAGE_FACADE_TOKEN, ArticlePageFacadeService } from '../services/article-page-facade-service';
import { Blog, Home } from '../ui/pages';
import { Article, articleResolver } from '../ui/pages/article';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Главная',
  },
  {
    path: 'blog/:id',
    component: Article,
    providers: [
      { provide: ARTICLE_EVENT_SUBSCRIBER_TOKEN, useClass: ArticleEventSubscriberService },
      { provide: ARTICLE_PAGE_STORE_TOKEN, useClass: ArticlePageStoreService },
      { provide: ARTICLE_PAGE_FACADE_TOKEN, useClass: ArticlePageFacadeService },
    ],
    resolve: {
      article: articleResolver,
    }
  },
  {
    path: 'blog',
    component: Blog,
    title: 'Блог',
  },
];
