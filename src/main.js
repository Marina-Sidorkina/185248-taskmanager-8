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

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const createCardBtnTemlate = (status, value) => (
  `<button type="button" class="card__btn card__btn--${status}">
    ${value}
  </button>`
);

const createCardBtnsTemlate = (controls) => {
  const block = CARD_STATUSES
    .map((value, index) => (
      createCardBtnTemlate(controls[index], value)
    ))
    .join(``);

  return (
    `<div class="card__control">
      ${block}
    </div>`
  );
};

const createCardColorBarTemplate = () => (
  `<div class="card__color-bar">
    <svg class="card__color-bar-wave" width="100%" height="10">
      <use xlink:href="#wave"></use>
    </svg>
  </div>`
);

const createCardTextareaTemplate = (text) => (
  `<div class="card__textarea-wrap">
    <label>
      <textarea
        class="card__text"
        placeholder="Start typing your text here..."
        name="text">${text}</textarea>
    </label>
  </div>`
);

const createCardDeadlineToggleTemplate = (setting) => (
  `<button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${setting}</span>
  </button>`
);

const createCardDeadlineInputTemlate = (parameter, setting) => (
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

const createCardDeadlineTemlate = (dateSetting, timeSetting) => (
  `<fieldset class="card__date-deadline">
    ${createCardDeadlineInputTemlate(`date`, dateSetting)}
    ${createCardDeadlineInputTemlate(`time`, timeSetting)}
  </fieldset>`
);

const createCardRepeatToggleTemplate = (status) => (
  `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${status}</span>
  </button>`
);

const createCardRepeatDayInputTemplate = (day) => (
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

const createCardRepeatDaysTemplate = () => {
  const block = CARD_DAYS
    .map((day) => createCardRepeatDayInputTemplate(day))
    .join(``);

  return (
    `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${block}
      </div>
    </fieldset>`
  );
};

const createCardDatesTemplate = (deadlineToggleValue, date, time, repeatStatus) => (
  `<div class="card__dates">
    ${createCardDeadlineToggleTemplate(deadlineToggleValue)}
    ${createCardDeadlineTemlate(date, time)}
    ${createCardRepeatToggleTemplate(repeatStatus)}
    ${createCardRepeatDaysTemplate()}
  </div>`
);

const createCardColorInputTemplate = (color) => (
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

const createCardColorsTemplate = () => {
  const block = CARD_COLOR_BUTTONS
    .map((color) => createCardColorInputTemplate(color))
    .join(``);

  return (
    `<div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${block}
      </div>
    </div>`
  );
};

const createCardImageTemplate = (image) => (
  `<label class="card__img-wrap">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${image}"
      alt="task picture"
      class="card__img"
    />
  </label>`
);

const createCardHashtagBtnTemplate = (value) => (
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

const createCardHashtagInputTemplate = () => (
  `<label>
    <input
      type="text"
      class="card__hashtag-input"
      name="hashtag-input"
      placeholder="Type new hashtag here"
    />
  </label>`
);

const createCardHashtagsTemplate = (hashtags) => {
  const block = hashtags
    .map((hashtag) => createCardHashtagBtnTemplate(hashtag))
    .join(``);

  return (
    `<div class="card__hashtag">
      <div class="card__hashtag-list">
        ${block}
      </div>
      ${createCardHashtagInputTemplate()}
    </div>`
  );
};

const createCardStatusBtnsTemplate = () => (
  `<div class="card__status-btns">
    <button class="card__save" type="submit">save</button>
    <button class="card__delete" type="button">delete</button>
  </div>`
);

const createCardTemplate = (cardObject) => (
  `<article class="card card--edit card--yellow card--repeat">
    <form class="card__form" method="get">
      <div class="card__inner">
      ${createCardBtnsTemlate(cardObject.controls)}
      ${createCardColorBarTemplate()}
      ${createCardTextareaTemplate(cardObject.text)}
       <div class="card__settings">
          <div class="card__details">
            ${createCardDatesTemplate(cardObject.deadlineToggleValue, cardObject.date, cardObject.time, cardObject.repeatStatus)}
            ${createCardHashtagsTemplate(cardObject.hashtags)}
          </div>
          ${createCardImageTemplate(cardObject.image)}
          ${createCardColorsTemplate()}
        </div>
          ${createCardStatusBtnsTemplate()}
       </div>
    </form>
  </article>`
);

const createCardListTemplate = (number, cardObject) => {
  let cardsBlock = ``;
  for (let i = 0; i < number; i++) {
    cardsBlock += createCardTemplate(cardObject);
  }

  return cardsBlock;
};

const createFilterInputTemplate = (name, status) => {
  const number = generateRandomNumber(1, 15);

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

const createFilterTemplate = () => (
  FILTERS_NAMES
    .map((name) => {
      const status = name === `TODAY` ? `checked` : ``;
      return createFilterInputTemplate(name, status);
    })
    .join(``)
);

const addFilterClickEventListener = () => {
  document.querySelectorAll(`.filter__input`).forEach((element) => {
    element.addEventListener(`click`, () => {
      boardElement.innerHTML = createCardListTemplate(element.value, card);
    });
  });
};

filterElement.innerHTML = createFilterTemplate();
boardElement.innerHTML = createCardListTemplate(CARD_LIMIT, card);

addFilterClickEventListener();
