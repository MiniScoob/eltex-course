import { Component, computed, input, OnDestroy } from '@angular/core';

import type { BlogArticleElement } from '../../../models';
import type { Mode } from './blog-article.model';
import { DEFAULT_IMAGE } from './blog-article.constants';
import { notEmptyFile, toDateString } from './blog-article.utils';

@Component({
  selector: 'blog-article',
  imports: [],
  templateUrl: './blog-article.html',
  styleUrl: './blog-article.module.scss',
})
export class BlogArticle implements OnDestroy {
  private _objectUrl?: string;

  public value = input.required<BlogArticleElement>();
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

  ngOnDestroy() {
    if (this._objectUrl) {
      URL.revokeObjectURL(this._objectUrl);
    }
  }
}
