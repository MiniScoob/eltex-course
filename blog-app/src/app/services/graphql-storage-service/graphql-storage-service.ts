import { inject, Injectable } from '@angular/core';

import { map } from 'rxjs';

import { Apollo } from 'apollo-angular';

import { Id, RatingAction } from '../../models';
import type { GraphqlStorage, GraphqlStorageResult } from './graphql-storage-service.model';
import {
  ARTICLE_RATING_MUTATIONS,
  COMMENT_RATING_MUTATIONS,
  GET_ARTICLE_WITH_COMMENTS,
} from './graphql-storage-service.constants';

@Injectable()
export class GraphqlStorageService implements GraphqlStorage {
  private readonly apollo = inject(Apollo);

  public getArticleWithComments(id: Id) {
    const strId = this.idToString(id);

    return this.apollo
      .query<GraphqlStorageResult>({
        query: GET_ARTICLE_WITH_COMMENTS,
        variables: { id: strId },
      })
      .pipe(
        map((result) => result.data ?? null)
      );
  };

  public updateArticleRating(id: Id, action: RatingAction) {
    const strId = this.idToString(id);

    return this.apollo
      .query<GraphqlStorageResult>({
        query: ARTICLE_RATING_MUTATIONS[action],
        variables: { id: strId },
      })
      .pipe(
        map((result) => result.data ?? null)
      );
  };

  public updateCommentRating(id: Id, action: RatingAction) {
    const strId = this.idToString(id);

    return this.apollo
      .query<GraphqlStorageResult>({
        query: COMMENT_RATING_MUTATIONS[action],
        variables: { id: strId },
      })
      .pipe(
        map((result) => result.data ?? null)
      );
  };

  private idToString(id: Id) {
    return id.toString();
  }
}
