import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';

import type { CommentRaw } from '../../../models';
import { getError, isInvalid } from '../../../utils';

@Component({
  selector: 'article-comment-form',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
  ],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.module.scss',
})
export class CommentForm {
  private readonly formBuilder = inject(FormBuilder);

  protected commentForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected save = output<CommentRaw>();

  protected handleSubmit() {
    const value: CommentRaw = {
      username: this.commentForm.value.username ?? '',
      content: this.commentForm.value.content ?? '',
    };

    this.commentForm.reset();

    this.save.emit(value);
  }

  protected isInvalid(name: keyof typeof this.commentForm.controls) {
    const control = this.commentForm.get(name);

    return isInvalid(control);
  }

  protected getError(name: keyof typeof this.commentForm.controls) {
    const control = this.commentForm.get(name);

    return getError(control);
  }
}
