import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import type {
  BlogArticleData,
  BlogArticleElement,
  BlogArticleRaw,
  Id,
} from '../../../models';
import { ARTICLES_FACADE_TOKEN } from '../../../services/articles-facade-service';
import { BlogArticleUpsert } from '../../containers';
import {
  BlogArticle,
  Pagination,
  Spinner,
  Statistics,
  Toolbar,
} from '../../components';

@Component({
  selector: 'app-blog',
  imports: [BlogArticle, BlogArticleUpsert, Statistics, Toolbar, Pagination, Spinner],
  templateUrl: './blog.html',
  styleUrl: './blog.module.scss',
})
export class Blog implements OnInit {
  protected store = inject(ARTICLES_FACADE_TOKEN);

  protected editingBlogArticle = signal<BlogArticleData | null>(null);
  protected isStatisticsOpen = signal<boolean>(false);
  protected isAddFormHidden = signal<boolean>(true);

  protected totalPages = computed(() => this.store.totalArticles() > 0
    ? Math.ceil(this.store.totalArticles() / this.store.pageSize())
    : 1,
  );
  protected formTitle = computed(() => this.editingBlogArticle()
    ? 'Редактировать статью'
    : 'Добавить статью'
  );

  public ngOnInit(){
    this.store.loadArticles();
    console.log(this.store.articles());
  }

  protected onSave(value: BlogArticleRaw) {
    const editing = this.editingBlogArticle();

    if (editing) {
      this.store.updateArticle(editing, value);

      this.editingBlogArticle.set(null);
    } else {
      this.store.addArticle(value);
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

    this.store.deleteArticle(id);
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

  protected onPageChanged(page: number) {
    this.store.changePage(page);
  }
}
