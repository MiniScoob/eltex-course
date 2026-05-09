import { Component, computed, input, OnDestroy, output } from '@angular/core';

import type { ArticlePreviewElement, Id } from '../../../models';
import { notEmptyFile, toDateString } from '../../../utils';
import type { Mode } from './blog-article-preview.model';
import { DEFAULT_IMAGE } from './blog-article-preview.constants';
import {DateTime} from '../date-time';

@Component({
  selector: 'blog-article-preview',
  imports: [
    DateTime
  ],
  templateUrl: './blog-article-preview.html',
  styleUrl: './blog-article-preview.module.scss',
})
export class BlogArticlePreview implements OnDestroy {
  private _objectUrl?: string;

  public value = input.required<ArticlePreviewElement>();
  public mode = input<Mode>('view');

  protected createdAt = computed(() => toDateString(new Date(this.value().createdAt)));
  protected photo = computed(() => {
    const file = this.value()?.photo;

    if (notEmptyFile(file)) {
      if (this._objectUrl) {
        URL.revokeObjectURL(this._objectUrl);
      }

      this._objectUrl = URL.createObjectURL(file!);
      return this._objectUrl;
    }

    return DEFAULT_IMAGE;
  });

  protected delete = output<Id>();
  protected edit = output<ArticlePreviewElement>();

  ngOnDestroy() {
    if (this._objectUrl) {
      URL.revokeObjectURL(this._objectUrl);
    }
  }

  protected handleDelete() {
    this.delete.emit(this.value().id);
  }

  protected handleEdit() {
    this.edit.emit(this.value());
  }
}
