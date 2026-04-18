import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import type { BlogArticleRaw } from '../../../models';
import { FileValueAccessor } from '../../directives';
import { COMMON_ERRORS, ERROR_PRIORITY } from './blog-article-upsert.constants';

@Component({
  selector: 'blog-article-upsert',
  imports: [FileValueAccessor, ReactiveFormsModule],
  templateUrl: './blog-article-upsert.html',
  styleUrl: './blog-article-upsert.module.scss',
})
export class BlogArticleUpsert {
  private formBuilder = inject(FormBuilder);

  public initialValue = input<BlogArticleRaw | null>();

  protected blogArticleForm = this.formBuilder.group({
    title: [this.initialValue()?.title ?? '', [Validators.required, Validators.minLength(25)]],
    text: [this.initialValue()?.text ?? '', [Validators.required, Validators.minLength(20)]],
    photo: [this.initialValue()?.photo ?? null],
  });

  constructor() {
    effect(() => {
      const blogArticle = this.initialValue();

      if (blogArticle) {
        this.blogArticleForm.patchValue({
          title: blogArticle.title,
          text: blogArticle.text,
          photo: blogArticle?.photo,
        });
      } else {
        this.blogArticleForm.reset();
      }
    });
  }

  protected submit = output<BlogArticleRaw>();
  protected cancel = output<void>();

  protected handleSubmit() {
    const value: BlogArticleRaw = {
      title: this.blogArticleForm.value.title ?? '',
      text: this.blogArticleForm.value.text ?? '',
      photo: this.blogArticleForm.value.photo ?? null,
    };

    this.blogArticleForm.reset();

    this.submit.emit(value);
  }

  protected handleCancel() {
    this.cancel.emit();
  }

  protected isInvalid(name: keyof typeof this.blogArticleForm.controls) {
    const control = this.blogArticleForm.get(name);

    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }

  protected getError(name: keyof typeof this.blogArticleForm.controls) {
    const control = this.blogArticleForm.get(name);

    if (!control || !control.errors || !control.touched) {
      return [];
    }

    return Object.entries(control.errors)
      .map(([key, value]) => {
        const errorHandler = COMMON_ERRORS[key as keyof typeof COMMON_ERRORS];

        if (!errorHandler) {
          return null;
        }

        return errorHandler(value);
      })
      .filter(Boolean) as string[];
  }
}
