import { getElementByQuery } from './helpers.js';

const ARTICLE_TITLE_QUERY = '.article__title';
const ARTICLE_TIME_PUBLISHED_QUERY = '.article__time-published';
const ARTICLE_TEXT_QUERY = '.article__text';
const ARTICLE_IMAGE_QUERY = '.article__image';

const DEFAULT_IMAGE = 'assets/images/cover.avif';

const MONTHS_ENUM = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const toDatetime = (date) =>
  date.split('T')[0];

const toDateString = (date) =>
  `${date.getUTCDate()} ${MONTHS_ENUM[date.getUTCMonth()]} ${date.getUTCFullYear()}`;

const notEmptyFile = (value) =>
  value instanceof File && value.size;

export class Article {
  #id;
  #title;
  #text;
  #createdAt;
  #photo;

  constructor(data) {
    this.#id = data.id;
    this.#title = data.title;
    this.#text = data.text;
    this.#createdAt = data.createdAt;
    this.#photo = data.photo;
  }

  get id() {
    return this.#id;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      text: this.#text,
      createdAt: this.#createdAt,
    };
  }

  createElement(templateElement) {
    const newArticle = templateElement.content.firstElementChild.cloneNode(true);
    newArticle.id = this.#id;

    getElementByQuery(ARTICLE_TITLE_QUERY, newArticle).textContent = this.#title;
    getElementByQuery(ARTICLE_TEXT_QUERY, newArticle).textContent = this.#text;

    const date = new Date(this.#createdAt);
    const timePublishedElement = getElementByQuery(ARTICLE_TIME_PUBLISHED_QUERY, newArticle);
    timePublishedElement.setAttribute('datetime', toDatetime(this.#createdAt));
    timePublishedElement.textContent = toDateString(date);

    const imageElement = getElementByQuery(ARTICLE_IMAGE_QUERY, newArticle);
    this.#prepareImageElement(imageElement, this.#photo);

    return newArticle;
  };

  #prepareImageElement(element) {
    if (notEmptyFile(this.#photo)) {
      const reader = new FileReader();

      reader.onload = (e) => {
        element.setAttribute('src', e.target.result);
      };

      reader.readAsDataURL(this.#photo);
    } else {
      element.setAttribute('src', DEFAULT_IMAGE);
    }

    element.setAttribute('alt', 'Картинка-обложка статьи');
  };
}
