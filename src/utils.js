import {hashtagCheck} from './constants';

export const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

export const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
export const generateRandomBoolean = () => Math.random() >= 0.5;
export const generateRandomDate = () => (Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);
export const generateRandomArray = (array, min, max) => array.sort(() => Math.random() - 0.5).slice(min, generateRandomNumber(min, max));

export const createNumberRange = (limit) => Array.from(new Array(limit), (_, i) => i);
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export const hasRepeatedDay = (repeatingDays) => Object.entries(repeatingDays).some(([_, isRepeatable]) => isRepeatable);

export const markNotRepeatedDays = (object, array) => {
  for (const pair of Object.entries(object)) {
    if (!array.some((key) => key === pair[0])) {
      object[pair[0]] = false;
    }
  }
};

export const getNotReapeatedDays = (property, value, array) => {
  if (property === `repeat`) {
    array.push(value);
  }
  return array;
};

export const checkHashtagValidity = (evt, tags) => {
  if (!hashtagCheck.HASH.test(evt.target.value)
  && evt.target.value.length !== 0) {
    return {isValid: false, error: `Хештег должен начинаться с символа #`};
  } else if (hashtagCheck.HASH_ONLY.test(evt.target.value)
  && evt.target.value.length !== 0) {
    return {isValid: false, error: `Хештег не может состоять только из символа #`};
  } else if (hashtagCheck.SPACE.test(evt.target.value)) {
    return {isValid: false, error: `Хештег не может содержать знак пробела`};
  } else if ((evt.target.value.length > 8 && evt.target.value.length !== 0) || (evt.target.value.length < 3 && evt.target.value.length !== 0)) {
    return {isValid: false, error: `Один хештег не может содержать более 8 и менее 3 символов, включая символ #`};
  } else if (tags.size === 5) {
    return {isValid: false, error: `Нельзя указывать более пяти хештегов`};
  } else {
    return {isValid: true, error: ``};
  }
};
