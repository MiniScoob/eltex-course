import type { Signal } from '@angular/core';
import { InjectionToken } from '@angular/core';

import type {ArticleDetails, Comment, Id} from '../../models';

export interface ArticlePageStore {
  article: Signal<ArticleDetails | null>;
  comments: Signal<Comment[]>;
  isLoaded: Signal<boolean>;

  setArticle: (article: ArticleDetails) => void;
  setComments: (comments: Comment[]) => void;
  setLoaded: () => void;
  addComment: (comment: Comment) => void;
  updateArticle: (article: Partial<ArticleDetails>) => void;
  updateComment: (id: Id, comment: Partial<Comment>) => void;
}

export const ARTICLE_PAGE_STORE_TOKEN = new InjectionToken<ArticlePageStore>('ArticlePageStore');
