import { InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';

import type {
  EnrichedArticleDetails,
  Id,
  RatingAction,
} from '../../models';

export type GraphqlStorageResult = {
  article: EnrichedArticleDetails;
};

export interface GraphqlStorage {
  getArticleWithComments: (id: Id) => Observable<GraphqlStorageResult | null>;
  updateArticleRating: (id: Id, action: RatingAction) => Observable<GraphqlStorageResult | null>;
  updateCommentRating: (id: Id, action: RatingAction) => Observable<GraphqlStorageResult | null>;
}

export const GRAPHQL_STORAGE_TOKEN = new InjectionToken<GraphqlStorage>('GraphqlStorage');
