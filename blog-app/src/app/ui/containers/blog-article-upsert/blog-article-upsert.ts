import { Component, inject } from '@angular/core';
import { FormBuilder, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';

import { filter } from 'rxjs';

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

  constructor() {
    this.blogArticleForm.events
      .pipe(filter((e) => e instanceof FormSubmittedEvent))
      .subscribe((e) => console.log('Status: ', e.source.value));
  }
}
