export type Id = string | number;

export interface BlogArticleData {
  id: Id;
  title: string;
  text: string;
  createdAt: string;
}

export interface BlogArticleElement extends BlogArticleData {
  photo?: File;
}
