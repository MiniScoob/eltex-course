import {
  type ApplicationConfig,
  LOCALE_ID,
  PLATFORM_ID,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { environment } from '../../environments/environment';
import {
  STORAGE_ENGINE_TOKEN,
  BrowserStorageEngineService,
  ServerStorageEngineService
} from '../services/storage-engine-service';
import {
  CATEGORIES_STORAGE_TOKEN,
  CategoriesStorageClientService,
  CategoriesStorageServerService,
} from '../services/categories-storage-service';
import { CATEGORIES_FACADE_TOKEN, CategoriesFacadeService } from '../services/categories-facade-service';
import {
  COMMENT_STORAGE_TOKEN,
  CommentsStorageClientService,
  CommentsStorageServerService
} from '../services/comments-storage-service';
import {
  ARTICLES_STORAGE_TOKEN,
  ArticlesStorageClientService,
  ArticlesStorageServerService,
} from '../services/articles-storage-service';
import { ARTICLES_STORE_TOKEN, ArticlesStoreService } from '../services/articles-store-service';
import { BLOG_FACADE_TOKEN, BlogFacadeService } from '../services/blog-facade-service';
import { ARTICLE_PAGE_STORE_TOKEN, ArticlePageStoreService } from '../services/article-page-store-service';
import { ARTICLE_PAGE_FACADE_TOKEN, ArticlePageFacadeService } from '../services/article-page-facade-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withComponentInputBinding(),
    ),
    provideClientHydration(withEventReplay()),
    { provide: LOCALE_ID, useValue: 'ru' },
    {
      provide: STORAGE_ENGINE_TOKEN,
      useFactory: (platformId: Object) => isPlatformBrowser(platformId)
        ? new BrowserStorageEngineService()
        : new ServerStorageEngineService(),
      deps: [PLATFORM_ID],
    },
    {
      provide: CATEGORIES_STORAGE_TOKEN,
      useClass: environment.useBackend
        ? CategoriesStorageServerService
        : CategoriesStorageClientService,
    },
    {
      provide: ARTICLES_STORAGE_TOKEN,
      useClass: environment.useBackend
        ? ArticlesStorageServerService
        : ArticlesStorageClientService
    },
    {
      provide: COMMENT_STORAGE_TOKEN,
      useClass: environment.useBackend
        ? CommentsStorageServerService
        : CommentsStorageClientService,
    },
    { provide: CATEGORIES_FACADE_TOKEN, useClass: CategoriesFacadeService },
    { provide: ARTICLES_STORE_TOKEN, useClass: ArticlesStoreService },
    { provide: BLOG_FACADE_TOKEN, useClass: BlogFacadeService },
    { provide: ARTICLE_PAGE_STORE_TOKEN, useClass: ArticlePageStoreService },
    { provide: ARTICLE_PAGE_FACADE_TOKEN, useClass: ArticlePageFacadeService },
  ],
};
