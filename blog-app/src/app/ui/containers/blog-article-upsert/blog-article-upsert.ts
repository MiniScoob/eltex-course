import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import type { ArticleRaw } from '../../../models';
import { getError, isInvalid, notEmptyFile } from '../../../utils';
import { FileValueAccessor } from '../../directives';
import { Autocomplete } from '../../components';

@Component({
  selector: 'blog-article-upsert',
  imports: [
    FileValueAccessor,
    ReactiveFormsModule,
    Autocomplete,
  ],
  templateUrl: './blog-article-upsert.html',
  styleUrl: './blog-article-upsert.module.scss',
})
export class BlogArticleUpsert {
  private readonly formBuilder = inject(FormBuilder);

  public categories = input.required<string[]>();
  public initialValue = input<ArticleRaw | null>();

  protected blogArticleForm = this.formBuilder.group({
    title: [this.initialValue()?.title ?? '', [Validators.required, Validators.minLength(25)]],
    content: [this.initialValue()?.content ?? '', [Validators.required, Validators.minLength(20)]],
    image: [this.initialValue()?.image ?? null],
    categoryName: [this.initialValue()?.categoryName ?? '', [Validators.required]],
  });

  constructor() {
    effect(() => {
      const blogArticle = this.initialValue();

      if (blogArticle) {
        this.blogArticleForm.patchValue({
          title: blogArticle.title,
          content: blogArticle.content,
          image: blogArticle?.image,
          categoryName: blogArticle?.categoryName,
        });
      } else {
        this.blogArticleForm.reset();
      }
    });
  }

  protected save = output<ArticleRaw>();
  protected cancel = output<void>();

  protected handleSubmit() {
    console.log(this.blogArticleForm.value);
    const value: ArticleRaw = {
      title: this.blogArticleForm.value.title ?? '',
      content: this.blogArticleForm.value.content ?? '',
      image: notEmptyFile(this.blogArticleForm.value.image) ? this.blogArticleForm.value.image : undefined,
      categoryName: this.blogArticleForm.value.categoryName ?? '',
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
