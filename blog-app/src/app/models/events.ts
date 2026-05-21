export enum ArticleEventType {
  CommentCreated = 'COMMENT_CREATED',
  CommentRatingChanged = 'COMMENT_RATING_CHANGED',
  ArticleRatingChanged = 'ARTICLE_RATING_CHANGED',
}

type EventBasic = {
  payload: {
    articleId: string;
  };
};

type CommentCreatedEvent = EventBasic & {
  type: ArticleEventType.CommentCreated;
  payload: {
    commentId: string;
    content: string;
    username: string;
    rating: number;
    createdAt: string;
  };
};

type CommentRatingChangedEvent = EventBasic & {
  type: ArticleEventType.CommentRatingChanged;
  payload: {
    commentId: string;
    rating: number;
    prevRating: number;
  };
};

type ArticleRatingChangedEvent = EventBasic & {
  type: ArticleEventType.ArticleRatingChanged;
  payload: {
    rating: number;
    prevRating: number;
  };
};

export type ArticleEvent = CommentCreatedEvent | CommentRatingChangedEvent | ArticleRatingChangedEvent;
