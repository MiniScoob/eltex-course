import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, type ResolveFn } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { tap } from 'rxjs';

import type { ArticleDetails } from '../../../models';
import { ARTICLE_DETAILS_STORAGE_TOKEN } from '../../../services/article-details-storage-service';
import { TITLE_SUFFIX } from './article.constants';

export const articleResolver: ResolveFn<ArticleDetails | null> = (route: ActivatedRouteSnapshot) => {
  const storage = inject(ARTICLE_DETAILS_STORAGE_TOKEN);
  const titleService = inject(Title);

  const id = route.paramMap.get('id');

  if (!id) {
    return null;
  }

  return storage.getArticle(id).pipe(
    tap((article) => {
      if (article?.title) {
        titleService.setTitle(`${article.title}${TITLE_SUFFIX}`);
      }
    }),
  );
};
