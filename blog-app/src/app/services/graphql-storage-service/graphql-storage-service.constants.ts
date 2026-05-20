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
    articleRatingUp(id: $id) {
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

const DOWN_ARTICLE_RATING = gql`
  mutation ArticleRatingDown($id: ID!) {
    articleRatingDown(id: $id) {
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

export const ARTICLE_RATING_MUTATIONS: Record<RatingAction, DocumentNode> = {
  up: UP_ARTICLE_RATING,
  down: DOWN_ARTICLE_RATING,
};

const UP_COMMENT_RATING = gql`
  mutation CommentRatingUp($id: ID!) {
    commentRatingUp(id: $id) {
      article {
        categoryId
        content
        createdAt
        id
        imgSrc
        rating
        title
        comments {
          articleId
          avgRating
          content
          createdAt
          id
          rating
          username
          votes
          votesCount
        }
        updatedAt
      }
    }
  }
`;

const DOWN_COMMENT_RATING = gql`
  mutation CommentRatingDown($id: ID!) {
    commentRatingDown(id: $id) {
      article {
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
  }
`;

export const COMMENT_RATING_MUTATIONS: Record<RatingAction, DocumentNode> = {
  up: UP_COMMENT_RATING,
  down: DOWN_COMMENT_RATING,
};
