import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import type { ArticlePreviewWithCategoryName, Id } from '../../../models';
import { HasRole } from '../../directives';
import { CategoryChips } from '../category-chips';
import { DateTime } from '../date-time';
import { DEFAULT_IMAGE } from './blog-article-preview.constants';

@Component({
  selector: 'blog-article-preview',
  imports: [
    CategoryChips,
    DateTime,
    MatIcon,
    RouterLink,
    HasRole,
  ],
  templateUrl: './blog-article-preview.html',
  styleUrl: './blog-article-preview.module.scss',
})
export class BlogArticlePreview {
  public value = input.required<ArticlePreviewWithCategoryName>();

  protected createdAt = computed(() => this.value().createdAt);
  protected image = computed(() => this.value().imgSrc ?? DEFAULT_IMAGE);

  protected delete = output<Id>();
  protected edit = output<ArticlePreviewWithCategoryName>();

  protected handleDelete() {
    this.delete.emit(this.value().id);
  }

  protected handleEdit() {
    this.edit.emit(this.value());
  }
}
