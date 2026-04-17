export type Id = string | number;

export interface BlogArticleData {
  id: Id;
  title: string;
  text: string;
  createdAt: string;
}

export type BlogArticleRaw = Omit<BlogArticleElement, 'id' | 'createdAt'>;

export interface BlogArticleElement extends BlogArticleData {
  photo?: File | null;
}
