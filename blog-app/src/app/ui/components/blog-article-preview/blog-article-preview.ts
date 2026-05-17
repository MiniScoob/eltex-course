import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import type { ArticlePreviewWithCategoryName, Id } from '../../../models';
import { toDateString } from '../../../utils';
import { CategoryChips } from '../category-chips';
import { DateTime } from '../date-time';
import { Mode } from './blog-article-preview.model';
import { DEFAULT_IMAGE } from './blog-article-preview.constants';
import {MatChip, MatChipSet} from '@angular/material/chips';

@Component({
  selector: 'blog-article-preview',
  imports: [
    CategoryChips,
    DateTime,
    MatIcon,
    RouterLink,
    MatChipSet,
    MatChip,
  ],
  templateUrl: './blog-article-preview.html',
  styleUrl: './blog-article-preview.module.scss',
})
export class BlogArticlePreview {
  public value = input.required<ArticlePreviewWithCategoryName>();
  public mode = input<Mode>('view');

  protected createdAt = computed(() => toDateString(new Date(this.value().createdAt)));
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
