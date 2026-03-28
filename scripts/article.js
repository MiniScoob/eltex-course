import { getElementById, getElementByQuery } from './helpers.js';

const ARTICLE_TEMPLATE_ID = 'article-template';
const ARTICLE_TITLE_QUERY = '.article__title';
const ARTICLE_TIME_PUBLISHED_QUERY = '.article__time-published';
const ARTICLE_TEXT_QUERY = '.article__text';
const ARTICLE_IMAGE_QUERY = '.article__image';
const ARTICLE_REMOVE_BUTTON_QUERY = '.article__remove-button';

const DEFAULT_IMAGE = 'assets/images/cover.avif';

const templateElement = getElementById(ARTICLE_TEMPLATE_ID);

const prepareArticleRemoveButton = (article, id, handler) => {
  getElementByQuery(ARTICLE_REMOVE_BUTTON_QUERY, article).addEventListener('click', () => handler(id, article));
};

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

const pad = (num) =>
  String(num).padStart(2, '0');

const toDatetime = (date) =>
  `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;

const toDateString = (date) =>
  `${date.getUTCDate()} ${MONTHS_ENUM[date.getUTCMonth()]} ${date.getUTCFullYear()}`;

const prepareImageElement = (element, photo) => {
  if (photo instanceof File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      element.setAttribute('src', e.target.result);
    };

    reader.readAsDataURL(photo);
  } else {
    element.setAttribute('src', DEFAULT_IMAGE);
  }

  element.setAttribute('alt', 'Картинка-обложка статьи');
};

export const createArticleElement = (data, removeHandler) => {
  const newArticle = templateElement.content.firstElementChild.cloneNode(true);

  prepareArticleRemoveButton(newArticle, data.id, removeHandler);

  getElementByQuery(ARTICLE_TITLE_QUERY, newArticle).textContent = data.title;
  getElementByQuery(ARTICLE_TEXT_QUERY, newArticle).textContent = data.text;

  const date = new Date();
  const timePublishedElement = getElementByQuery(ARTICLE_TIME_PUBLISHED_QUERY, newArticle);
  timePublishedElement.setAttribute('datetime', toDatetime(date));
  timePublishedElement.textContent = toDateString(date);

  const imageElement = getElementByQuery(ARTICLE_IMAGE_QUERY, newArticle);
  prepareImageElement(imageElement, data.photo);

  return newArticle;
};
