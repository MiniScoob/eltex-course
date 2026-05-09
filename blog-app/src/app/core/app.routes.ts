import { Routes } from '@angular/router';

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
