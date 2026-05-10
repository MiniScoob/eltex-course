import type { Comment, Id } from './models';

export type CommentsStorageData = {
  articleId: Id;
  comments: Omit<Comment, 'articleId'>[];
};
