import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import type {
  ArticlePreviewWithCategoryName,
  ArticleRaw,
  Id,
} from '../../../models';
import { WithCategoryNamePipe } from '../../../pipes';
import { BLOG_FACADE_TOKEN } from '../../../services/blog-facade-service';
import { HasRole } from '../../directives';
import { BlogArticleUpsert } from '../../containers';
import {
  BlogArticlePreview,
  Pagination,
  Spinner,
  Statistics,
  Toolbar,
} from '../../components';

@Component({
  selector: 'app-blog',
  imports: [
    BlogArticlePreview,
    BlogArticleUpsert,
    Statistics,
    Toolbar,
    Pagination,
    Spinner,
    WithCategoryNamePipe,
    HasRole,
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.module.scss',
})
export class Blog implements OnInit {
  protected readonly store = inject(BLOG_FACADE_TOKEN);

  private _editingBlogArticle = signal<ArticlePreviewWithCategoryName | null>(null);

  protected isStatisticsOpen = signal<boolean>(false);
  protected isAddFormHidden = signal<boolean>(true);

  protected editingBlogArticle = computed<ArticleRaw | null>(() => {
    const editing = this._editingBlogArticle();

    if (!editing) {
      return null;
    }

    return this.store.getArticleFormData(editing);
  });

  protected totalPages = computed(() => this.store.totalArticles() > 0
    ? Math.ceil(this.store.totalArticles() / this.store.pageSize())
    : 1,
  );

  protected formTitle = computed(() => this._editingBlogArticle()
    ? 'Редактировать статью'
    : 'Добавить статью'
  );

  protected categoriesNames = computed(() => this.store.categories().map((c) => c.name));

  public ngOnInit(){
    this.store.load();
  }

  protected onSave(value: ArticleRaw) {
    const editing = this._editingBlogArticle();

    if (editing) {
      this.store.updateArticle(editing.id, { ...value });

      this._editingBlogArticle.set(null);
    } else {
      this.store.addArticle({ ...value });
    }
  }

  protected onCancel() {
    if (this._editingBlogArticle()) {
      this._editingBlogArticle.set(null);
    }

    this.hideFrom();
  }

  protected onDeleteBlogArticle(id: Id) {
    if (this._editingBlogArticle()?.id === id) {
      this._editingBlogArticle.set(null);
    }

    this.store.deleteArticle(id);
  }

  protected onEditBlogArticle(value: ArticlePreviewWithCategoryName) {
    this._editingBlogArticle.set(value);
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
