import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { ARTICLES_STORAGE_TOKEN, ArticlesStorageService } from '../services/articles-storage-service';
import { ARTICLE_STORE_TOKEN, ArticlesStoreService } from '../services/articles-store-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: ARTICLES_STORAGE_TOKEN, useClass: ArticlesStorageService },
    { provide: ARTICLE_STORE_TOKEN, useClass: ArticlesStoreService },
  ],
};
