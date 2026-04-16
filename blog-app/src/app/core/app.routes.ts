import { Routes } from '@angular/router';

import { Blog, Home } from '../ui/pages';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'blog',
    component: Blog,
  },
];
