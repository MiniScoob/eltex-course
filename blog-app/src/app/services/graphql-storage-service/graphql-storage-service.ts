import { inject, Injectable } from '@angular/core';

import { map } from 'rxjs';

import { Apollo } from 'apollo-angular';

import { Id, RatingAction } from '../../models';
import type {
  ArticleRatingChangeResult,
  CommentRatingChangeResult,
  GetArticleResult,
  GraphqlStorage,
} from './graphql-storage-service.model';
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
      .query<GetArticleResult>({
        query: GET_ARTICLE_WITH_COMMENTS,
        variables: { id: strId },
      })
      .pipe(
        map((result) => result?.data?.article ?? null),
      );
  };

  public updateArticleRating(id: Id, action: RatingAction) {
    const strId = this.idToString(id);

    return this.apollo
      .mutate<ArticleRatingChangeResult>({
        mutation: ARTICLE_RATING_MUTATIONS[action],
        variables: { id: strId },
      })
      .pipe(
        map((result) => result?.data?.article ?? null),
      );
  };

  public updateCommentRating(id: Id, action: RatingAction) {
    const strId = this.idToString(id);

    return this.apollo
      .mutate<CommentRatingChangeResult>({
        mutation: COMMENT_RATING_MUTATIONS[action],
        variables: { id: strId },
      })
      .pipe(
        map((result) => result?.data?.comment ?? null),
      );
  };

  private idToString(id: Id) {
    return id.toString();
  }
}
