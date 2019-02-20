'use strict';
const TASKS_BLOCK = document.querySelector(`.board__tasks`);
const FILTERS_BLOCK = document.querySelector(`.main__filter`);
const CARDS_NUMBER = 7;

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min)
;

const renderControlButton = (status, value) =>
  `<button type="button" class="card__btn card__btn--${status}">
    ${value}
  </button>`
;
const renderCardControlBlock = () => {
  const STATUS_VARIANTS = [`edit`, `archive`, `disabled`];
  const VALUES = [`edit`, `archive`, `favorites`];
  let controlButtonsBlock = ``;
  for (let i = 0; i < VALUES.length; i++) {
    controlButtonsBlock = controlButtonsBlock + renderControlButton(STATUS_VARIANTS[i], VALUES[i]);
  }
  return `<div class="card__control">
    ${controlButtonsBlock}
  </div>`;
};

const renderColorBar = () =>
  `<div class="card__color-bar">
    <svg class="card__color-bar-wave" width="100%" height="10">
      <use xlink:href="#wave"></use>
    </svg>
  </div>`
;

const renderTextarea = () => {
  const TEXT = `Here is a card with filled data`;
  return `<div class="card__textarea-wrap">
    <label>
      <textarea
        class="card__text"
        placeholder="Start typing your text here..."
        name="text">${TEXT}</textarea>
    </label>
  </div>`;
};

const renderDeadlineToggle = (setting) =>
  `<button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${setting}</span>
  </button>`
;

const renderDeadlineSetting = (parameter, setting) =>
  `<label class="card__input-deadline-wrap">
    <input
      class="card__${parameter}"
      type="text"
      placeholder="${setting}"
      name="${parameter}"
      value="${setting}"
    />
  </label>`
;

const renderDeadlineSettings = (dateSetting, timeSetting) => {
  const FIRST_PARAMETER = `date`;
  const SECOND_PARAMETER = `time`;
  return `<fieldset class="card__date-deadline">
  ${renderDeadlineSetting(FIRST_PARAMETER, dateSetting)}
  ${renderDeadlineSetting(SECOND_PARAMETER, timeSetting)}
  </fieldset>`;
};

const renderRepeatStatus = (status) =>
  `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${status}</span>
  </button>`
;

const renderRepeatDay = (day) =>
  `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day}-4"
    name="repeat"
    value="${day}"
  />
  <label class="card__repeat-day" for="repeat-${day}-4"
    >${day}</label
  >`
;

const renderRepeatDays = () => {
  const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
  let daysBlock = ``;
  for (let i = 0; i < DAYS.length; i++) {
    daysBlock = daysBlock + renderRepeatDay(DAYS[i]);
  }
  return `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
      ${daysBlock}
    </div>
  </fieldset>`;
};

const renderCardDatesBlock = () => {
  const DEADLINE_TOGGLE_VALUE = `yes`;
  const DATE_SETTING = `23 September`;
  const TIME_SETTING = `11:15 PM`;
  const REPEAT_STATUS = `yes`;
  return `<div class="card__dates">
  ${renderDeadlineToggle(DEADLINE_TOGGLE_VALUE)}
  ${renderDeadlineSettings(DATE_SETTING, TIME_SETTING)}
  ${renderRepeatStatus(REPEAT_STATUS)}
  ${renderRepeatDays()}
  </div>`;
};

const renderColorButton = (color) =>
  `<input
    type="radio"
    id="color-${color}-4"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
  />
  <label
    for="color-${color}-4"
    class="card__color card__color--${color}"
    >${color}</label
  >`
;

const renderColorButtons = () => {
  const COLOR_BUTTONS_VARIANTS = [`black`, `yellow`, `blue`, `green`, `pink`];
  let buttonsBlock = ``;
  for (let i = 0; i < COLOR_BUTTONS_VARIANTS.length; i++) {
    buttonsBlock = buttonsBlock + renderColorButton(COLOR_BUTTONS_VARIANTS[i]);
  }
  return `<div class="card__colors-inner">
    <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${buttonsBlock}
      </div>
    </div>
  </div>`;
};

const renderImage = () => {
  const SRC = `img/sample-img.jpg`;
  return `<label class="card__img-wrap">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${SRC}"
      alt="task picture"
      class="card__img"
    />
  </label>`;
};

const renderHashtag = (value) =>
  `<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="repeat"
      class="card__hashtag-hidden-input"
    />
    <button type="button" class="card__hashtag-name">
      #${value}
    </button>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`
;

const renderHashtagInput = () =>
  `<label>
    <input
      type="text"
      class="card__hashtag-input"
      name="hashtag-input"
      placeholder="Type new hashtag here"
    />
  </label>`
;

const renderHashtagsBlock = () => {
  const HASHTAGS = [`repeat`, `cinema`, `entertaiment`];
  let hashtagsBlock = ``;
  for (let i = 0; i < HASHTAGS.length; i++) {
    hashtagsBlock = hashtagsBlock + renderHashtag(HASHTAGS[i]);
  }
  return `<div class="card__hashtag">
    <div class="card__hashtag-list">
      ${hashtagsBlock}
    </div>
    ${renderHashtagInput()}
  </div>`;
};

const renderStatusBtns = () =>
  `<div class="card__status-btns">
    <button class="card__save" type="submit">save</button>
    <button class="card__delete" type="button">delete</button>
  </div>`
;

const renderCard = () =>
  `<article class="card card--edit card--yellow card--repeat">
    <form class="card__form" method="get">
      <div class="card__inner">
      ${renderCardControlBlock()}
      ${renderColorBar()}
      ${renderTextarea()}
      <div class="card__settings">
        <div class="card__details">
          ${renderCardDatesBlock()}
          ${renderHashtagsBlock()}
        </div>
        ${renderImage()}
        ${renderColorButtons()}
        ${renderStatusBtns()}
      </div>
    </form>
  </article>`
;

const renderCardsList = (number) => {
  let cardsBlock = ``;
  for (let i = 0; i < number; i++) {
    cardsBlock = cardsBlock + renderCard();
  }
  return cardsBlock;
};

const renderFilter = (name, status) => {
  const NUMBER = getRandomNumber(1, 15);
  return `<input
    type="radio"
    id="filter__${name.toLowerCase()}"
    class="filter__input visually-hidden"
    name="filter"
    value="${NUMBER}"
    ${status}
  />
  <label for="filter__${name.toLowerCase()}" class="filter__label">
    ${name} <span class="filter__all-count">${NUMBER}</span></label
  >`;
};
const renderFiltersBlock = () => {
  const NAMES = [`ALL`, `OVERDUE`, `TODAY`, `FAVORITES`, `Repeating`, `Tags`, `ARCHIVE`];
  let filtersBlock = ``;
  for (let i = 0; i < NAMES.length; i++) {
    let status = NAMES[i] === `TODAY` ? `checked` : ``;
    filtersBlock = filtersBlock + renderFilter(NAMES[i], status);
  }
  return filtersBlock;
};

const addFiltersEventListener = () => {
  const FILTERS = document.querySelectorAll(`.filter__input`);
  FILTERS.forEach((item) => {
    item.addEventListener(`click`, () => {
      TASKS_BLOCK.innerHTML = renderCardsList(item.value);
    });
  });
};

FILTERS_BLOCK.innerHTML = renderFiltersBlock();
TASKS_BLOCK.innerHTML = renderCardsList(CARDS_NUMBER);
addFiltersEventListener();
