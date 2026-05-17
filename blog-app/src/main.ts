import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/app.config';
import { App } from './app/core/app';

registerLocaleData(localeRu);
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
