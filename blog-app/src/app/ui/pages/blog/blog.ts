import { Component, signal } from '@angular/core';

import type { BlogArticleElement, BlogArticleRaw, Id } from '../../../models';
import { BlogArticleUpsert } from '../../containers';
import { BlogArticle, Statistics, Toolbar } from '../../components';
import { INITIAL_ARTICLES } from './blog.constants';

@Component({
  selector: 'app-blog',
  imports: [BlogArticle, BlogArticleUpsert, Statistics, Toolbar],
  templateUrl: './blog.html',
  styleUrl: './blog.module.scss',
})
export class Blog {
  protected blogArticles = signal<BlogArticleElement[]>([...INITIAL_ARTICLES]);
  protected editingBlogArticle = signal<BlogArticleElement | null>(null);
  protected isStatisticsOpen = signal<boolean>(false);
  protected isAddFormHidden = signal<boolean>(true);

  protected onSave(value: BlogArticleRaw) {
    const editing = this.editingBlogArticle();

    if (editing) {
      this.blogArticles.update((arr) => arr.map((v) => v.id === editing.id
        ? { ...v, ...value }
        : v
      ));

      this.editingBlogArticle.set(null);
    } else {
      const newBlogArticle = {
        ...value,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      this.blogArticles.update((arr) => [...arr, newBlogArticle]);
    }
  }

  protected onCancel() {
    if (this.editingBlogArticle()) {
      this.editingBlogArticle.set(null);
    }

    this.hideFrom();
  }

  protected onDeleteBlogArticle(id: Id) {
    if (this.editingBlogArticle()?.id === id) {
      this.editingBlogArticle.set(null);
    }

    this.blogArticles.update((arr) => arr.filter((v) => v.id !== id));
  }

  protected onEditBlogArticle(value: BlogArticleElement) {
    this.editingBlogArticle.set(value);
    this.showFrom();
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

  protected showStatistics() {
    if (this.isStatisticsOpen()) {
      return;
    }

    this.isStatisticsOpen.set(true);
  }

  protected closeStatistics() {
    if (!this.isStatisticsOpen()) {
      return;
    }

    this.isStatisticsOpen.set(false);
  }
}
