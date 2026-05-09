import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import type { ArticleRaw } from '../../../models';
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

  public initialValue = input<ArticleRaw | null>();

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

  protected save = output<ArticleRaw>();
  protected cancel = output<void>();

  protected handleSubmit() {
    const value: ArticleRaw = {
      title: this.blogArticleForm.value.title ?? '',
      text: this.blogArticleForm.value.text ?? '',
      photo: this.blogArticleForm.value.photo ?? null,
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
