import { Routes } from '@angular/router';

import { Article, Blog, Home } from '../ui/pages';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'blog/:id',
    component: Article,
  },
  {
    path: 'blog',
    component: Blog,
  },
];
