export type Id = string | number;

export interface Comment {
  id: Id;
  author: string;
  text: string;
  createdAt: string;
  rating: number;
}

export interface ArticleDetails {
  id: Id;
  title: string;
  text: string;
  createdAt: string;
  rating: number;
  comments: Comment[];
}

export type ArticlePreview = Pick<ArticleDetails, 'id' | 'title' | 'text' | 'createdAt'>;

export interface ArticlePreviewElement extends ArticlePreview {
  photo?: File | null;
}

export type ArticleRaw = Omit<ArticlePreviewElement, 'id' | 'createdAt'>;
