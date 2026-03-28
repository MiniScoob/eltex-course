import * as helpers from './helpers.js';
import { StorageService } from './StorageService.js';
import { createArticleElement } from './article.js';

const ADD_ARTICLE_ID = 'add-article-section';
const ADD_ARTICLE_FORM_ID = 'add-article-form';
const SHOW_ADD_ARTICLE_BUTTON_ID = 'show-add-article-button';
const CANCEL_BUTTON_ID = 'cancel-button';

const LOADER_CONTAINER_ID = 'loader-wrapper';
const ARTICLE_LIST_ID = 'article-list';
const EMPTY_MESSAGE_ID = 'empty-message';
const ERROR_MESSAGE_ID = 'error-message';

const LONG_ANIMATION = 500;

const ARTICLES_KEY = 'articles';

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

const removePhoto = (data) => {
  const { photo, ...restData } = data;

  return restData;
};

const saveArticle = (data) => {
  const restData = removePhoto(data);
  StorageService.set(ARTICLES_KEY, [...store.articles, restData]);
  store.articles = [...store.articles, data];
};

const deleteArticleById = (id) => {
  const filtered = store.articles.filter(article => article.id !== id);

  StorageService.set(ARTICLES_KEY, filtered.map((data) => removePhoto(data)));

  store.articles = [...filtered];
};

const getArticlesFromStorage = () => {
  const articles = StorageService.get(ARTICLES_KEY);

  if (!articles) {
    store.articles = [];
    return [];
  }

  store.articles = [...articles];
  return articles;
};

/* Работа со списком статей (UI + данные) */

const clearArticleList = () => {
  articleList.replaceChildren();
};

const removeArticleElement = (element) => {
  element.remove();
}

const removeArticle = (id, element) => {
  const wouldEmpty = store.articles.length === 1;

  try {
    deleteArticleById(id);
    removeArticleElement(element);

    if (wouldEmpty) {
      setState(STATE.EMPTY);
      updateUI();
    }
  } catch (err) {
    showError(err.message);
  }
};

const appendArticleElements = (...element) => {
  articleList.append(...element);
};

const addArticle = (data) => {
  const wasEmpty = store.articles.length === 0;

  try {
    saveArticle(data);
    const articleElement = createArticleElement(data, removeArticle);
    appendArticleElements(articleElement);

    if (wasEmpty) {
      setState(STATE.SUCCESS);
      updateUI();
    }
  } catch (err) {
    showError(err.message);
  }
};

const renderArticleList = () => {
  clearArticleList();

  const articleElements = store.articles.map((data) => createArticleElement(data, removeArticle));

  appendArticleElements(...articleElements);
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

const handleAddArticleSubmit = (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    ...Object.fromEntries(new FormData(form)),
    id: crypto.randomUUID(),
  }

  addArticle(data);

  form.reset();
};

const init = () => {
  loadArticles(); // не дожидаемся выполнения

  hideAddArticleSection();

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
