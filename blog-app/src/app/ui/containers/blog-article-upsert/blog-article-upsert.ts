import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import type { BlogArticleRaw } from '../../../models';
import { FileValueAccessor } from '../../directives';

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
    title: [this.initialValue()?.title ?? '', Validators.required],
    text: [this.initialValue()?.text ?? ''],
    photo: [this.initialValue()?.photo ?? null],
  });

  constructor() {
    effect(() => {
      console.log('effect');
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

  protected addBlogArticle = output<BlogArticleRaw>();

  protected onSubmit() {
    const value: BlogArticleRaw = {
      title: this.blogArticleForm.value.title ?? '',
      text: this.blogArticleForm.value.text ?? '',
      photo: this.blogArticleForm.value.photo ?? null,
    };

    this.blogArticleForm.reset();

    this.addBlogArticle.emit(value);
  }
}
