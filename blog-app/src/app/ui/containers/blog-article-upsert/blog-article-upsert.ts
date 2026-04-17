import { Component, inject, output } from '@angular/core';
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

  protected blogArticleForm = this.formBuilder.group({
    title: ['', Validators.required],
    text: [''],
    photo: [null],
  });

  public addBlogArticle = output<BlogArticleRaw>();

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
