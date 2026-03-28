'use strict';

const ADD_ARTICLE_ID = 'add-article-section';
const ADD_ARTICLE_FORM_ID = 'add-article-form';
const SHOW_ADD_ARTICLE_BUTTON_ID = 'show-add-article-button';
const CANCEL_BUTTON_ID = 'cancel-button';

const PAGE_STATISTICS_ID = 'page-statistics';
const CLOSE_PAGE_STATISTICS_BUTTON_ID = 'close-page-statistics';
const TOTAL_ARTICLES_ID = 'total-articles';
const TOTAL_COMMENTS_ID = 'total-comments';
const SHOW_PAGE_STATISTICS_BUTTON_ID = 'show-page-statistics-button';

const ARTICLE_TEMPLATE_ID = 'article-template';
const ARTICLE_LIST_QUERY = '.article-list';
const ARTICLE_TITLE_QUERY = '.article__title';
const ARTICLE_TIME_PUBLISHED_QUERY = '.article__time-published';
const ARTICLE_TEXT_QUERY = '.article__text';
const ARTICLE_IMAGE_QUERY = '.article__image';
const ARTICLE_REMOVE_BUTTON_QUERY = '.article__remove-button';

const LONG_ANIMATION = 500;
const DEFAULT_IMAGE = 'assets/images/cover.avif';

const MONTHS_ENUM = {
  0: 'января',
  1: 'февраля',
  2: 'марта',
  3: 'апреля',
  4: 'мая',
  5: 'июня',
  6: 'июля',
  7: 'августа',
  8: 'сентября',
  9: 'октября',
  10: 'ноября',
  11: 'декабря',
};

const getElementById = (id) =>
  document.getElementById(id);

const getElementByQuery = (query, element = document) =>
  element.querySelector(query);

const scrollIntoView = (element, behavior = 'smooth', block = 'center') =>
  element.scrollIntoView({
    behavior,
    block,
  });

const hideElement = (element) => {
  const { classList } = element;

  if (!classList.contains('hidden')) {
    classList.add('hidden');
  }
};

const showElement = (element) => {
  const { classList } = element;

  if (classList.contains('hidden')) {
    classList.remove('hidden');
  }
};

const removeElement = (element) => {
  element.remove();
};

const showAddArticleSection = () => {
  const addArticleSection = getElementById(ADD_ARTICLE_ID);

  showElement(addArticleSection);

  setTimeout(() =>scrollIntoView(addArticleSection), LONG_ANIMATION);
};

const hideAddArticleSection = () => {
  const addArticleSection = getElementById(ADD_ARTICLE_ID);
  hideElement(addArticleSection);
};

const prepareArticleRemoveButton = (article) => {
  getElementByQuery(ARTICLE_REMOVE_BUTTON_QUERY, article).addEventListener('click', () => removeElement(article));
};

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

const addArticle = (data) => {
  const articleListElement = getElementByQuery(ARTICLE_LIST_QUERY);
  const templateElement = getElementById(ARTICLE_TEMPLATE_ID);

  const newArticle = templateElement.content.firstElementChild.cloneNode(true);

  prepareArticleRemoveButton(newArticle);

  getElementByQuery(ARTICLE_TITLE_QUERY, newArticle).textContent = data.title;
  getElementByQuery(ARTICLE_TEXT_QUERY, newArticle).textContent = data.text;

  const date = new Date();
  const timePublishedElement = getElementByQuery(ARTICLE_TIME_PUBLISHED_QUERY, newArticle);
  timePublishedElement.setAttribute('datetime', toDatetime(date));
  timePublishedElement.textContent = toDateString(date);

  const imageElement = getElementByQuery(ARTICLE_IMAGE_QUERY, newArticle);
  prepareImageElement(imageElement, data.photo);

  articleListElement.appendChild(newArticle);
};

const handleAddArticleSubmit = (e) => {
  e.preventDefault();

  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  addArticle(data);

  form.reset();
};

const countArticles = () => {
  const articleListElement = getElementByQuery(ARTICLE_LIST_QUERY);

  return articleListElement.childElementCount;
};

const closeDialogOnBackDropClick = ({ currentTarget, target }) => {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement;

  if (isClickedOnBackDrop) {
    dialogElement.close()
  }
};

const closePageStatistics = () => {
  const dialogElement = getElementById(PAGE_STATISTICS_ID);

  dialogElement.close();
};

const prepareAndShowPageStatistics = () => {
  const pageStatisticElement = getElementById(PAGE_STATISTICS_ID);
  const totalArticlesElement = getElementById(TOTAL_ARTICLES_ID);
  const totalCommentsElement = getElementById(TOTAL_COMMENTS_ID);

  totalArticlesElement.textContent = countArticles().toString();
  totalCommentsElement.textContent = '0';

  pageStatisticElement.showModal();
};

const prepareArticles = () => {
  const articleListElement = getElementByQuery(ARTICLE_LIST_QUERY);

  [...articleListElement.children].forEach((articleElement) => {
    prepareArticleRemoveButton(articleElement);
  });
};

const init = () => {
  hideAddArticleSection();

  prepareArticles();

  const showAddArticleButton = getElementById(SHOW_ADD_ARTICLE_BUTTON_ID);
  showAddArticleButton.addEventListener('click', showAddArticleSection);

  const addArticleForm = getElementById(ADD_ARTICLE_FORM_ID);
  addArticleForm.addEventListener('submit', handleAddArticleSubmit);

  const showPageStatisticButton = getElementById(SHOW_PAGE_STATISTICS_BUTTON_ID);
  showPageStatisticButton.addEventListener('click', prepareAndShowPageStatistics);

  const pageStatisticElement = getElementById(PAGE_STATISTICS_ID);
  pageStatisticElement.addEventListener('click', closeDialogOnBackDropClick);

  const closePageStatisticButton = getElementById(CLOSE_PAGE_STATISTICS_BUTTON_ID);
  closePageStatisticButton.addEventListener('click', closePageStatistics);

  const cancelButton = getElementById(CANCEL_BUTTON_ID);
  cancelButton.addEventListener('click', hideAddArticleSection);
};

init();
