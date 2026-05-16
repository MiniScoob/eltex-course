import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import type { ArticleData, ArticleRaw } from '../../../models';
import { getError, isInvalid } from '../../../utils';
import { FileValueAccessor } from '../../directives';

@Component({
  selector: 'blog-article-upsert',
  imports: [FileValueAccessor, ReactiveFormsModule],
  templateUrl: './blog-article-upsert.html',
  styleUrl: './blog-article-upsert.module.scss',
})
export class BlogArticleUpsert {
  private readonly formBuilder = inject(FormBuilder);

  public initialValue = input<ArticleData | null>();

  protected blogArticleForm = this.formBuilder.group({
    title: [this.initialValue()?.title ?? '', [Validators.required, Validators.minLength(25)]],
    content: [this.initialValue()?.content ?? '', [Validators.required, Validators.minLength(20)]],
    image: [this.initialValue()?.image ?? null],
  });

  constructor() {
    effect(() => {
      const blogArticle = this.initialValue();

      if (blogArticle) {
        this.blogArticleForm.patchValue({
          title: blogArticle.title,
          content: blogArticle.content,
          image: blogArticle?.image,
        });
      } else {
        this.blogArticleForm.reset();
      }
    });
  }

  protected save = output<ArticleRaw>();
  protected cancel = output<void>();

  protected handleSubmit() {
    const value: ArticleRaw = {
      title: this.blogArticleForm.value.title ?? '',
      content: this.blogArticleForm.value.content ?? '',
      image: this.blogArticleForm.value.image ?? null,
      categoryId: null,
      categoryName: '',
    };

    this.blogArticleForm.reset();

    this.save.emit(value);
  }

  protected handleCancel() {
    this.cancel.emit();
  }

  protected isInvalid(name: keyof typeof this.blogArticleForm.controls) {
    const control = this.blogArticleForm.get(name);

    return isInvalid(control);
  }

  protected getError(name: keyof typeof this.blogArticleForm.controls) {
    const control = this.blogArticleForm.get(name);

    return getError(control);
  }
}
