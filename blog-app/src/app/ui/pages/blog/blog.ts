import { Component, signal } from '@angular/core';

import type { BlogArticleElement } from '../../../models';
import { BlogArticleUpsert } from '../../containers';
import { BlogArticle } from '../../components';

const ARTICLES: BlogArticleElement[] = [
  {
    id: 1,
    title: 'Я уронил отварную сосиску',
    text: '4 марта около шести часов вечера выпусник НГТУ, Владислав Попов, '
      + 'закончив отваривать молочную сосиску СПК, подцепил её кончиком вилки, чтобы '
      + 'переместить из кипятка в миску с отварным картофелем. '
      + 'Я думал, что сосиска прочно держится на зубчиках вилки, но я ошибся... вспоминаю я.',
    createdAt: '2026-03-05',
  },
  {
    id: 2,
    title: 'Перекат в вайб-кодинг',
    text: 'Размышлял над текущим своим положением дел. К сожалению, ведение блога продолжается. '
      + 'К хорошим новостям — теперь все статьи будет писать ИИ-агент.',
    createdAt: '2026-02-28',
  },
  {
    id: 3,
    title: 'Моей помощнице',
    text: 'Даяна, сейчас 11:30, 24 февраля. Въезжаю в городок Твин Пикс',
    createdAt: '2026-02-24',
  },
];

@Component({
  selector: 'app-blog',
  imports: [BlogArticle, BlogArticleUpsert],
  templateUrl: './blog.html',
  styleUrl: './blog.module.scss',
})
export class Blog {
  protected blogArticles = signal<BlogArticleElement[]>([...ARTICLES]);
}
