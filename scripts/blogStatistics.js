'use strict';

import { getElementById, getElementByQuery } from './helpers.js';

const ARTICLE_LIST_QUERY = '.article-list';
const BLOG_STATISTICS_ID = 'blog-statistics';
const SHOW_BLOG_STATISTICS_BUTTON_ID = 'show-blog-statistics-button';
const CLOSE_BLOG_STATISTICS_BUTTON_ID = 'close-blog-statistics';
const TOTAL_ARTICLES_ID = 'total-articles';
const TOTAL_COMMENTS_ID = 'total-comments';

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

const closeBlogStatistics = () => {
  const dialogElement = getElementById(BLOG_STATISTICS_ID);

  dialogElement.close();
};

const prepareAndShowBlogStatistics = () => {
  const pageStatisticElement = getElementById(BLOG_STATISTICS_ID);
  const totalArticlesElement = getElementById(TOTAL_ARTICLES_ID);
  const totalCommentsElement = getElementById(TOTAL_COMMENTS_ID);

  totalArticlesElement.textContent = countArticles().toString();
  totalCommentsElement.textContent = '0';

  pageStatisticElement.showModal();
};

const initBlogStatistics = () => {
  const showPageStatisticButton = getElementById(SHOW_BLOG_STATISTICS_BUTTON_ID);
  showPageStatisticButton.addEventListener('click', prepareAndShowBlogStatistics);

  const pageStatisticElement = getElementById(BLOG_STATISTICS_ID);
  pageStatisticElement.addEventListener('click', closeDialogOnBackDropClick);

  const closePageStatisticButton = getElementById(CLOSE_BLOG_STATISTICS_BUTTON_ID);
  closePageStatisticButton.addEventListener('click', closeBlogStatistics);
};

initBlogStatistics();
