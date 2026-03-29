'use strict';

export const getElementById = (id) =>
  document.getElementById(id);

export const getElementByQuery = (query, element = document) =>
  element.querySelector(query);

export const getAllElementsByQuery = (query, element = document) =>
  element.querySelectorAll(query);

export const scrollIntoView = (element, behavior = 'smooth', block = 'center') =>
  element.scrollIntoView({
    behavior,
    block,
  });

export const hideElement = (element, className = 'hidden-collapse') => {
  const { classList } = element;

  if (!classList.contains(className)) {
    classList.add(className);
  }
};

export const showElement = (element, className = 'hidden-collapse') => {
  const { classList } = element;

  if (classList.contains(className)) {
    classList.remove(className);
  }
};

export const removeElement = (element) => {
  element.remove();
};
