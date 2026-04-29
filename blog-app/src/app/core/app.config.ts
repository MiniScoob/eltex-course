import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { DATA_STORAGE_TOKEN, DataService } from '../services/data-service';
import { STORE_TOKEN, StoreService } from '../services/store-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: DATA_STORAGE_TOKEN, useClass: DataService },
    { provide: STORE_TOKEN, useClass: StoreService },
  ],
};
