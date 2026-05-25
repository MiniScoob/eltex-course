import {
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';

import type { CommentRaw } from '../../../models';
import { getError } from '../../../utils';

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

  public readonly username = input<string | null>(null);

  protected commentForm = this.formBuilder.group({
    username: [this.username() ?? '', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor() {
    effect(() => {
      const username = this.username();

      this.commentForm.patchValue({
        username: username ?? '',
      });
    });
  }

  protected save = output<CommentRaw>();

  protected handleSubmit() {
    const value: CommentRaw = {
      username: this.commentForm.value.username ?? '',
      content: this.commentForm.value.content ?? '',
    };

    this.commentForm.patchValue({
      content: '',
    });

    this.save.emit(value);
  }

  protected getError(name: keyof typeof this.commentForm.controls) {
    const control = this.commentForm.get(name);

    return getError(control);
  }
}
