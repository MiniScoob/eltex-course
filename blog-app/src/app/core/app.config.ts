import {
  type ApplicationConfig,
  LOCALE_ID,
  PLATFORM_ID,
  provideBrowserGlobalErrorListeners,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { InMemoryCache } from '@apollo/client';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { environment } from '../../environments/environment';
import {
  STORAGE_ENGINE_TOKEN,
  BrowserStorageEngineService,
  ServerStorageEngineService,
} from '../services/storage-engine-service';
import {
  AUTH_SERVICE_TOKEN,
  AuthClientService,
  AuthServerService,
} from '../services/auth-service';
import {
  CATEGORIES_STORAGE_TOKEN,
  CategoriesStorageClientService,
  CategoriesStorageServerService,
} from '../services/categories-storage-service';
import {
  CATEGORIES_FACADE_TOKEN,
  CategoriesFacadeService,
} from '../services/categories-facade-service';
import {
  COMMENT_STORAGE_TOKEN,
  CommentsStorageClientService,
  CommentsStorageServerService,
} from '../services/comments-storage-service';
import {
  ARTICLES_STORAGE_TOKEN,
  ArticlesStorageClientService,
  ArticlesStorageServerService,
} from '../services/articles-storage-service';
import { ARTICLES_STORE_TOKEN, ArticlesStoreService } from '../services/articles-store-service';
import { BLOG_FACADE_TOKEN, BlogFacadeService } from '../services/blog-facade-service';
import { AuthInterceptor } from '../interceptors';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideRouter(routes, withComponentInputBinding()),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: '/api/graphql',
        }),
        cache: new InMemoryCache(),
      };
    }),
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: STORAGE_ENGINE_TOKEN,
      useFactory: (platformId: Object) =>
        isPlatformBrowser(platformId)
          ? new BrowserStorageEngineService()
          : new ServerStorageEngineService(),
      deps: [PLATFORM_ID],
    },
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: environment.useBackend
        ? AuthServerService
        : AuthClientService,
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
        : ArticlesStorageClientService,
    },
    {
      provide: COMMENT_STORAGE_TOKEN,
      useClass: environment.useBackend
        ? CommentsStorageServerService
        : CommentsStorageClientService,
    },
    ...environment.providers,
    { provide: CATEGORIES_FACADE_TOKEN, useClass: CategoriesFacadeService },
    { provide: ARTICLES_STORE_TOKEN, useClass: ArticlesStoreService },
    { provide: BLOG_FACADE_TOKEN, useClass: BlogFacadeService },
    provideAppInitializer(() => {
      const authService = inject(AUTH_SERVICE_TOKEN);
      return authService.restoreSession();
    }),
  ],
};
