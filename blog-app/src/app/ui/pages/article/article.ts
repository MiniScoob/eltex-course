import { Component, inject, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import type { Id } from '../../../models';
import { ARTICLE_DETAILS_FACADE_TOKEN } from '../../../services/article-details-facade-service';
import { CommentForm } from '../../containers';
import {ArticleComment, Spinner} from '../../components';
import { DEFAULT_IMAGE } from './article.constants';

@Component({
  selector: 'app-article',
  imports: [CommentForm, Spinner, ArticleComment],
  templateUrl: './article.html',
  styleUrl: './article.module.scss',
})
export class Article implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  protected readonly store = inject(ARTICLE_DETAILS_FACADE_TOKEN);

  private readonly articleId: Id | null;

  protected readonly photo = DEFAULT_IMAGE;

  constructor() {
    this.articleId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.articleId !== null) {
      this.store.loadArticle(this.articleId);
    }
  }
}
