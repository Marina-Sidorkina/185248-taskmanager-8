'use strict';

const CARD_DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const CARD_STATUSES = [`edit`, `archive`, `favorites`];
const CARD_COLOR_BUTTONS = [`black`, `yellow`, `blue`, `green`, `pink`];
const CARD_LIMIT = 7;

const FILTERS_NAMES = [`ALL`, `OVERDUE`, `TODAY`, `FAVORITES`, `Repeating`, `Tags`, `ARCHIVE`];

const card = {
  controls: [`edit`, `archive`, `disabled`],
  text: `Here is a card with filled data`,
  image: `img/sample-img.jpg`,
  hashtags: [`repeat`, `cinema`, `entertaiment`],
  deadlineToggleValue: `yes`,
  date: `23 September`,
  time: `11:15 PM`,
  repeatStatus: `yes`
};

const boardElement = document.querySelector(`.board__tasks`);
const filterElement = document.querySelector(`.main__filter`);

// getRandomNumber -> create/generate/..
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

// renderControlButton -> create...Template
const renderControlButton = (status, value) => (
  `<button type="button" class="card__btn card__btn--${status}">
    ${value}
  </button>`
);

const renderCardControlBlock = () => {
  const block = CARD_STATUSES
    .map((value, index) => (
      renderControlButton(card.controls[index], value)
    ))
    .join(``);

  return (
    `<div class="card__control">
      ${block}
    </div>`
  );
};

const renderColorBar = () => (
  `<div class="card__color-bar">
    <svg class="card__color-bar-wave" width="100%" height="10">
      <use xlink:href="#wave"></use>
    </svg>
  </div>`
);

const renderTextarea = () => (
  `<div class="card__textarea-wrap">
    <label>
      <textarea
        class="card__text"
        placeholder="Start typing your text here..."
        name="text">${card.text}</textarea>
    </label>
  </div>`
);

const renderDeadlineToggle = (setting) => (
  `<button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${setting}</span>
  </button>`
);

const renderDeadlineSetting = (parameter, setting) => (
  `<label class="card__input-deadline-wrap">
    <input
      class="card__${parameter}"
      type="text"
      placeholder="${setting}"
      name="${parameter}"
      value="${setting}"
    />
  </label>`
);

const renderDeadlineSettings = (dateSetting, timeSetting) => (
  `<fieldset class="card__date-deadline">
    ${renderDeadlineSetting(`date`, dateSetting)}
    ${renderDeadlineSetting(`time`, timeSetting)}
  </fieldset>`
);

const renderRepeatStatus = (status) => (
  `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${status}</span>
  </button>`
);

const renderRepeatDay = (day) => (
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
);

const renderRepeatDays = () => {
  const block = CARD_DAYS
    .map((day) => renderRepeatDay(day))
    .join(``);

  return (
    `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${block}
      </div>
    </fieldset>`
  );
};

const renderCardDatesBlock = () => (
  `<div class="card__dates">
    ${renderDeadlineToggle(card.deadlineToggleValue)}
    ${renderDeadlineSettings(card.date, card.time)}
    ${renderRepeatStatus(card.repeatStatus)}
    ${renderRepeatDays()}
  </div>`
);

const renderColorButton = (color) => (
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
);

const renderColorButtons = () => {
  const block = CARD_COLOR_BUTTONS
    .map((color) => renderColorButton(color))
    .join(``);

  return (
    `<div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
        <div class="card__colors-wrap">
          ${block}
        </div>
      </div>
    </div>`
  );
};

const renderImage = () => (
  `<label class="card__img-wrap">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${card.image}"
      alt="task picture"
      class="card__img"
    />
  </label>`
);

const renderHashtag = (value) => (
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
);

const renderHashtagInput = () => (
  `<label>
    <input
      type="text"
      class="card__hashtag-input"
      name="hashtag-input"
      placeholder="Type new hashtag here"
    />
  </label>`
);

const renderHashtagsBlock = (hashtags) => {
  const block = hashtags
    .map((hashtag) => renderHashtag(hashtag))
    .join(``);

  return (
    `<div class="card__hashtag">
      <div class="card__hashtag-list">
        ${block}
      </div>
      ${renderHashtagInput()}
    </div>`
  );
};

const renderStatusBtns = () => (
  `<div class="card__status-btns">
    <button class="card__save" type="submit">save</button>
    <button class="card__delete" type="button">delete</button>
  </div>`
);

const renderCard = () => (
  `<article class="card card--edit card--yellow card--repeat">
    <form class="card__form" method="get">
      <div class="card__inner">
      ${renderCardControlBlock()}
      ${renderColorBar()}
      ${renderTextarea()}
      <div class="card__settings">
        <div class="card__details">
          ${renderCardDatesBlock()}
          ${renderHashtagsBlock(card.hashtags)}
        </div>
        ${renderImage()}
        ${renderColorButtons()}
        ${renderStatusBtns()}
      </div>
    </form>
  </article>`
);

// @NOTICE: улучшить по желанию
const renderCardList = (number) => {
  let cardsBlock = ``;
  for (let i = 0; i < number; i++) {
    cardsBlock += renderCard(card); // используем из глобальной области видимости
  }

  return cardsBlock;
};

const renderFilter = (name, status) => {
  const number = getRandomNumber(1, 15);

  return (
    `<input
      type="radio"
      id="filter__${name.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      value="${number}"
      ${status}
    />
    <label for="filter__${name.toLowerCase()}" class="filter__label">
      ${name} <span class="filter__all-count">${number}</span></label
    >`
  );
};

const renderFilterBlock = () => (
  FILTERS_NAMES
    .map((name) => {
      const status = name === `TODAY` ? `checked` : ``;
      return renderFilter(name, status);
    })
    .join(``)
);

const addFiltersEventListener = () => {
  document.querySelectorAll(`.filter__input`).forEach((element) => {
    element.addEventListener(`click`, () => {
      boardElement.innerHTML = renderCardList(element.value);
    });
  });
};

filterElement.innerHTML = renderFilterBlock();
boardElement.innerHTML = renderCardList(CARD_LIMIT);

addFiltersEventListener();
