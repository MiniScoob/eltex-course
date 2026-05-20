export type Id = string | number;

export interface Comment {
  id: Id;
  articleId: Id;
  username: string;
  content: string;
  rating: number;
  createdAt: string;
}

export type CommentData = Pick<Comment, 'username' | 'content' | 'articleId'>;

export type CommentRaw = Omit<CommentData, 'articleId'>;

export interface Category {
  id: Id;
  name: string;
  createdAt: string;
}

export type CategoryRaw = Pick<Category, 'name'>;

export interface ArticleDetails {
  id: Id;
  title: string;
  content: string;
  imgSrc: string | null;
  categoryId: Id;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type EnrichedArticleDetails = ArticleDetails & {
  comments: Comment[];
};

export type ArticlePreview = Pick<
  ArticleDetails,
  'id' | 'title' | 'content' | 'imgSrc' | 'categoryId' | 'createdAt'
>;

export type ArticlePreviewWithCategoryName = ArticlePreview & {
  categoryName: string | null;
};

export type ArticleData = Pick<ArticleDetails, 'title' | 'content' | 'categoryId'> & {
  image?: File | null;
};

export type ArticleRaw = Omit<ArticleData, 'categoryId'> & {
  categoryName: string;
};
