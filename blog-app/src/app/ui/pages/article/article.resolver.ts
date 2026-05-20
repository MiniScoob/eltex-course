import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, type ResolveFn } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { map, tap } from 'rxjs';

import { ARTICLE_PAGE_FACADE_TOKEN } from '../../../services/article-page-facade-service';
import { TITLE_SUFFIX } from './article.constants';

export const articleResolver: ResolveFn<null> = (route: ActivatedRouteSnapshot) => {
  const store = inject(ARTICLE_PAGE_FACADE_TOKEN);
  const titleService = inject(Title);

  const id = route.paramMap.get('id');

  if (!id) {
    return null;
  }

  return store
    .load(id)
    .pipe(
      tap((article) => {
        if (article?.title) {
          titleService.setTitle(`${article.title}${TITLE_SUFFIX}`);
        }
      }),
      map(() => null)
    );
};
