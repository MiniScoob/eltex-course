import {Component, computed, inject, OnInit, signal} from '@angular/core';

import type { BlogArticleData, BlogArticleElement, BlogArticleRaw, Id } from '../../../models';
import { ARTICLES_STORAGE_TOKEN, type ArticlesStorageResult } from '../../../services/articles-storage-service';
import { ARTICLE_STORE_TOKEN } from '../../../services/articles-store-service';
import { BlogArticleUpsert } from '../../containers';
import { BlogArticle, Statistics, Toolbar } from '../../components';

@Component({
  selector: 'app-blog',
  imports: [BlogArticle, BlogArticleUpsert, Statistics, Toolbar],
  templateUrl: './blog.html',
  styleUrl: './blog.module.scss',
})
export class Blog implements OnInit {
  private storage = inject(ARTICLES_STORAGE_TOKEN);
  protected store = inject(ARTICLE_STORE_TOKEN);

  protected editingBlogArticle = signal<BlogArticleData | null>(null);
  protected isStatisticsOpen = signal<boolean>(false);
  protected isAddFormHidden = signal<boolean>(true);

  protected blogArticles = computed<BlogArticleData[]>(() => this.store.articles());
  protected page = computed<number>(() => this.store.page());
  protected formTitle = computed(() => this.editingBlogArticle()
    ? 'Редактировать статью'
    : 'Добавить статью'
  );

  public ngOnInit(){
    if (!this.store.isLoaded()) {
      this.loadArticles();
    }
  }

  protected onSave(value: BlogArticleRaw) {
    const editing = this.editingBlogArticle();
    const { photo, ...rest } = value;

    if (editing) {
      this.storage.updateArticle({ ...editing, ...rest}, this.page()).subscribe((result) => {
        this.updateStore(result.articles, result.total);
      });

      this.editingBlogArticle.set(null);
    } else {
      const newBlogArticle = {
        ...rest,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      this.storage.addArticle(newBlogArticle, this.page()).subscribe((result) => {
        this.updateStore(result.articles, result.total);
      });
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

    this.storage.deleteArticle(id, this.page()).subscribe((result) => {
      this.updateStore(result.articles, result.total);
    });
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

  private loadArticles() {
    this.storage.getArticles(this.store.page()).subscribe((result) => {
      this.updateStore(result.articles, result.total);
      this.store.setLoaded(true);
    });
  }

  private updateStore(articles: BlogArticleData[], total: number) {
    this.store.setArticles(articles);
    this.store.setTotalArticles(total);
  }
}
