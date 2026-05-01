import { type ApplicationConfig, PLATFORM_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import {
  STORAGE_ENGINE_TOKEN,
  BrowserStorageEngineService,
  ServerStorageEngineService
} from '../services/storage-engine-service';
import { ARTICLES_STORAGE_TOKEN, ArticlesStorageService } from '../services/articles-storage-service';
import { ARTICLE_STORE_TOKEN, ArticlesStoreService } from '../services/articles-store-service';
import { ARTICLES_FACADE_TOKEN, ArticlesFacadeService } from '../services/articles-facade-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    {
      provide: STORAGE_ENGINE_TOKEN,
      useFactory: (platformId: Object) => isPlatformBrowser(platformId)
        ? new BrowserStorageEngineService()
        : new ServerStorageEngineService(),
      deps: [PLATFORM_ID],
    },
    { provide: ARTICLES_STORAGE_TOKEN, useClass: ArticlesStorageService },
    { provide: ARTICLE_STORE_TOKEN, useClass: ArticlesStoreService },
    { provide: ARTICLES_FACADE_TOKEN, useClass: ArticlesFacadeService },
  ],
};
