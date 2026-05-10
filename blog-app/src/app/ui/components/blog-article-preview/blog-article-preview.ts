import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import type { ArticlePreview, Id } from '../../../models';
import { toDateString } from '../../../utils';
import { DateTime } from '../date-time';
import type { Mode } from './blog-article-preview.model';
import { DEFAULT_IMAGE } from './blog-article-preview.constants';

@Component({
  selector: 'blog-article-preview',
  imports: [
    DateTime,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './blog-article-preview.html',
  styleUrl: './blog-article-preview.module.scss',
})
export class BlogArticlePreview {
  public value = input.required<ArticlePreview>();
  public mode = input<Mode>('view');

  protected createdAt = computed(() => toDateString(new Date(this.value().createdAt)));
  protected image = computed(() => this.value().imgSrc ?? DEFAULT_IMAGE);

  protected delete = output<Id>();
  protected edit = output<ArticlePreview>();

  protected handleDelete() {
    this.delete.emit(this.value().id);
  }

  protected handleEdit() {
    this.edit.emit(this.value());
  }
}
