import { type ApplicationConfig, PLATFORM_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import {
  STORAGE_ENGINE_TOKEN,
  BrowserStorageEngineService,
  ServerStorageEngineService
} from '../services/storage-engine-service';
import { CATEGORIES_STORAGE_TOKEN, CategoriesStorageService } from '../services/categories-storage-service';
import { CATEGORIES_FACADE_TOKEN, CategoriesFacadeService } from '../services/categories-facade-service';
import { ARTICLES_STORAGE_TOKEN, ArticlesStorageService } from '../services/articles-storage-service';
import { ARTICLE_STORE_TOKEN, ArticlesStoreService } from '../services/articles-store-service';
import { ARTICLES_FACADE_TOKEN, ArticlesFacadeService } from '../services/articles-facade-service';
import { ARTICLE_DETAILS_STORAGE_TOKEN, ArticleDetailsStorageService } from '../services/article-details-storage-service';
import { ARTICLE_DETAILS_STORE_TOKEN, ArticleDetailsStoreService } from '../services/article-details-store-service';
import { ARTICLE_DETAILS_FACADE_TOKEN, ArticleDetailsFacadeService } from '../services/article-details-facade-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    {
      provide: STORAGE_ENGINE_TOKEN,
      useFactory: (platformId: Object) => isPlatformBrowser(platformId)
        ? new BrowserStorageEngineService()
        : new ServerStorageEngineService(),
      deps: [PLATFORM_ID],
    },
    {
      provide: CATEGORIES_STORAGE_TOKEN, useClass: CategoriesStorageService,
    },
    {
      provide: CATEGORIES_FACADE_TOKEN, useClass: CategoriesFacadeService,
    },
    { provide: ARTICLES_STORAGE_TOKEN, useClass: ArticlesStorageService },
    { provide: ARTICLE_STORE_TOKEN, useClass: ArticlesStoreService },
    { provide: ARTICLES_FACADE_TOKEN, useClass: ArticlesFacadeService },
    { provide: ARTICLE_DETAILS_STORAGE_TOKEN, useClass: ArticleDetailsStorageService },
    { provide: ARTICLE_DETAILS_STORE_TOKEN, useClass: ArticleDetailsStoreService },
    { provide: ARTICLE_DETAILS_FACADE_TOKEN, useClass: ArticleDetailsFacadeService },
  ],
};
