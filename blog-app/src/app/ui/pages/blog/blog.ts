import { Component, signal } from '@angular/core';

import type { BlogArticleElement, BlogArticleRaw } from '../../../models';
import { BlogArticleUpsert } from '../../containers';
import { BlogArticle, Toolbar } from '../../components';
import { INITIAL_ARTICLES } from './blog.constants';

@Component({
  selector: 'app-blog',
  imports: [BlogArticle, BlogArticleUpsert, Toolbar],
  templateUrl: './blog.html',
  styleUrl: './blog.module.scss',
})
export class Blog {
  protected blogArticles = signal<BlogArticleElement[]>([...INITIAL_ARTICLES]);
  protected isAddFormHidden = signal<boolean>(true);

  protected onAddBlogArticle(value: BlogArticleRaw) {
    const newBlogArticle = {
      ...value,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    this.blogArticles.update((arr) => [...arr, newBlogArticle]);
  }

  protected showFrom() {
    if (!this.isAddFormHidden()) {
      return;
    }

    this.isAddFormHidden.set(false);
  }

  protected hideFrom() {
    if (this.isAddFormHidden()) {
      return;
    }

    this.isAddFormHidden.set(true);
  }
}
