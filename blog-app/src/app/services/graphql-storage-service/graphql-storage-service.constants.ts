import { gql } from 'apollo-angular';
import type { DocumentNode } from 'graphql/language';

import type { RatingAction } from '../../models';

export const GET_ARTICLE_WITH_COMMENTS = gql`
  query Article($id: ID!) {
    article(id: $id) {
      categoryId
      content
      createdAt
      id
      imgSrc
      rating
      title
      updatedAt
      comments {
        articleId
        content
        createdAt
        id
        rating
        username
      }
    }
  }
`;

const UP_ARTICLE_RATING = gql`
  mutation ArticleRatingUp($id: ID!) {
    article: articleRatingUp(id: $id) {
      rating
    }
  }
`;

const DOWN_ARTICLE_RATING = gql`
  mutation ArticleRatingDown($id: ID!) {
    article: articleRatingDown(id: $id) {
      rating
    }
  }
`;

export const ARTICLE_RATING_MUTATIONS: Record<RatingAction, DocumentNode> = {
  up: UP_ARTICLE_RATING,
  down: DOWN_ARTICLE_RATING,
};

const UP_COMMENT_RATING = gql`
  mutation CommentRatingUp($id: ID!) {
    comment: commentRatingUp(id: $id) {
      rating
    }
  }
`;

const DOWN_COMMENT_RATING = gql`
  mutation CommentRatingDown($id: ID!) {
    comment: commentRatingDown(id: $id) {
      rating
    }
  }
`;

export const COMMENT_RATING_MUTATIONS: Record<RatingAction, DocumentNode> = {
  up: UP_COMMENT_RATING,
  down: DOWN_COMMENT_RATING,
};
