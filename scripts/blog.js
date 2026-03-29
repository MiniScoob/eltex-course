'use strict';

import * as helpers from './helpers.js';
import { StorageService } from './StorageService.js';
import { Article } from './Article.js';

const ARTICLE_TEMPLATE_ID = 'article-template';
const ADD_ARTICLE_ID = 'add-article-section';
const ADD_ARTICLE_FORM_ID = 'add-article-form';
const SHOW_ADD_ARTICLE_BUTTON_ID = 'show-add-article-button';
const CANCEL_BUTTON_ID = 'cancel-button';

const LOADER_CONTAINER_ID = 'loader-wrapper';
const ARTICLE_LIST_ID = 'article-list';
const EMPTY_MESSAGE_ID = 'empty-message';
const ERROR_MESSAGE_ID = 'error-message';

const ARTICLE_CONTAINER_QUERY = '.article__container';
const REMOVE_ARTICLE_BUTTON_QUERY = '.article__remove-button';

const FORM_SUBMITTING_ATTRIBUTE = 'data-submitting';

const LONG_ANIMATION = 500;

const ARTICLES_KEY = 'articles';

const articleTemplateElement = helpers.getElementById(ARTICLE_TEMPLATE_ID);

const loader = helpers.getElementById(LOADER_CONTAINER_ID);
const articleList = helpers.getElementById(ARTICLE_LIST_ID);
const emptyMessage = helpers.getElementById(EMPTY_MESSAGE_ID);
const errorMessage = helpers.getElementById(ERROR_MESSAGE_ID);

const STATE = {
  LOADING: 'loading',
  EMPTY: 'empty',
  SUCCESS: 'success',
  ERROR: 'error',
};

const store = {
  state: STATE.EMPTY,
  articles: [],
};

/* Работа с состоянием экрана */

const setState = (state) => {
  store.state = state;
};

const updateUI = () => {
  [loader, articleList, emptyMessage, errorMessage].forEach((element) =>
    helpers.hideElement(element, 'hidden-remove')
  );

  switch (store.state) {
    case STATE.LOADING:
      helpers.showElement(loader, 'hidden-remove');
      break;
    case STATE.SUCCESS:
      helpers.showElement(articleList, 'hidden-remove');
      break;
    case STATE.ERROR:
      helpers.showElement(errorMessage, 'hidden-remove');
      break;
    case STATE.EMPTY:
    default:
      helpers.showElement(emptyMessage, 'hidden-remove');
      break;
  }
};

/* Работа с хранилищем статей (store + localStorage) */

const prepareArticleData = (formData) => ({
  ...Object.fromEntries(formData),
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
});

const saveArticle = (data) => {
  const newArticle = new Article(data);

  StorageService.set(ARTICLES_KEY, [...store.articles, newArticle]);
  store.articles = [...store.articles, newArticle];

  return newArticle;
};

const deleteArticleById = (id) => {
  const filtered = store.articles.filter(article => article.id !== id);

  StorageService.set(ARTICLES_KEY, filtered);

  store.articles = [...filtered];
};

const getArticlesFromStorage = () => {
  const articles = StorageService.get(ARTICLES_KEY);

  if (!Array.isArray(articles)) {
    store.articles = [];
  } else {
    store.articles = articles.map((data) => new Article(data));
  }

  return store.articles;
};

/* Работа с UI статей */

const clearArticleList = () => {
  articleList.replaceChildren();
};

const removeArticleElement = (element) => {
  element.remove();
};

const appendArticleElements = (...element) => {
  articleList.append(...element);
};

const renderArticleList = () => {
  clearArticleList();

  const articleElements = store.articles.map((value) => value.createElement(articleTemplateElement));

  appendArticleElements(...articleElements);
};

/* Работа со списком статей (UI + данные) */

const removeArticle = (element) => {
  const wouldEmpty = store.articles.length === 1;

  try {
    deleteArticleById(element.dataset.id);
    removeArticleElement(element);

    if (wouldEmpty) {
      setState(STATE.EMPTY);
      updateUI();
    }
  } catch (err) {
    showError(err.message);
  }
};

const addArticle = (data) => {
  const wasEmpty = store.articles.length === 0;

  try {
    const newArticle = saveArticle(data);
    const articleElement = newArticle.createElement(articleTemplateElement);
    appendArticleElements(articleElement);

    if (wasEmpty) {
      setState(STATE.SUCCESS);
      updateUI();
    }
  } catch (err) {
    showError(err.message);
  }
};

const loadArticles = async () => {
  setState(STATE.LOADING);
  updateUI();

  try {
    /* Иммитация загрузки */
    await sleep(2_000);

    const result = getArticlesFromStorage();

    if (result.length > 0) {
      renderArticleList();
      setState(STATE.SUCCESS);
    } else {
      setState(STATE.EMPTY);
    }
  } catch (err) {
    showError(err.message);
    setState(STATE.ERROR);
  }

  updateUI();
};

/* Вспомогательные элементы */

const showAddArticleSection = () => {
  const addArticleSection = helpers.getElementById(ADD_ARTICLE_ID);

  helpers.showElement(addArticleSection);

  setTimeout(() => helpers.scrollIntoView(addArticleSection), LONG_ANIMATION);
};

const hideAddArticleSection = () => {
  const addArticleSection = helpers.getElementById(ADD_ARTICLE_ID);
  helpers.hideElement(addArticleSection);
};

const toggleElementsDisabledState = (element, query, disabled) => {
  const buttons = helpers.getAllElementsByQuery(query, element);

  buttons.forEach(button => {
    button.disabled = disabled;
  })
};

const disableForm = (form) => {
  form.setAttribute(FORM_SUBMITTING_ATTRIBUTE, 'true');
  toggleElementsDisabledState(form, 'button', true);
  toggleElementsDisabledState(form, 'textarea', true);
  toggleElementsDisabledState(form, 'input', true);
};

const activateForm = (form) => {
  form.removeAttribute(FORM_SUBMITTING_ATTRIBUTE);
  toggleElementsDisabledState(form, 'button', false);
  toggleElementsDisabledState(form, 'textarea', false);
  toggleElementsDisabledState(form, 'input', false);
};

const handleAddArticleSubmit = async (e) => {
  e.preventDefault();


  const form = e.target;

  if (form.hasAttribute(FORM_SUBMITTING_ATTRIBUTE)) {
    return;
  }

  const data = prepareArticleData(new FormData(form));

  disableForm(form);

  await sleep(5_500);
  addArticle(data);

  form.reset();

  activateForm(form);
};

const handleRemoveArticle = (e) => {
  const deleteButton = e.target.closest(REMOVE_ARTICLE_BUTTON_QUERY);

  if (!deleteButton) {
    return;
  }

  const deletedArticle = deleteButton.closest(ARTICLE_CONTAINER_QUERY);

  removeArticle(deletedArticle);
};

const init = () => {
  loadArticles(); // не дожидаемся выполнения

  hideAddArticleSection();

  articleList.addEventListener('click', handleRemoveArticle);

  const showAddArticleButton = helpers.getElementById(SHOW_ADD_ARTICLE_BUTTON_ID);
  showAddArticleButton.addEventListener('click', showAddArticleSection);

  const addArticleForm = helpers.getElementById(ADD_ARTICLE_FORM_ID);
  addArticleForm.addEventListener('submit', handleAddArticleSubmit);

  const cancelButton = helpers.getElementById(CANCEL_BUTTON_ID);
  cancelButton.addEventListener('click', hideAddArticleSection);
};

init();

/* Заглушки */

function showError(message) {
  console.error(message);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
