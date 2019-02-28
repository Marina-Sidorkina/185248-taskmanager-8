import {COLORS} from '../constants';

const STATUSES = [`edit`, `archive`, `favorites`];
const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const createButtonTemlate = (card, value) => (
  `<button type="button" class="card__btn card__btn--${value}
    ${(!card.isFavorite && value === `favorites`) ? `card__btn--disabled` : ``}">
    ${value}
  </button>`
);

const createButtonsTemlate = (card) => {
  const block = STATUSES
    .map((value) => (
      createButtonTemlate(card, value)
    ))
    .join(``);

  return (
    `<div class="card__control">
      ${block}
    </div>`
  );
};

const createColorBarTemplate = () => (
  `<div class="card__color-bar">
    <svg class="card__color-bar-wave" width="100%" height="10">
      <use xlink:href="#wave"></use>
    </svg>
  </div>`
);

const createTextareaTemplate = (card) => (
  `<div class="card__textarea-wrap">
    <label>
      <textarea
        class="card__text"
        placeholder="Start typing your text here..."
        name="text">${card.title}</textarea>
    </label>
  </div>`
);

const createDeadlineToggleTemplate = (card) => (
  `<button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${card.deadlineToggleValue ? `yes` : `no`}</span>
  </button>`
);

const createDeadlineInputTemlate = (parameter, setting) => (
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

const getDueDate = (card) => {
  const date = new Date(card.dueDate);
  return {
    day: date.getDate(),
    month: MONTHS[date.getMonth()],
    hour: (date.getHours() <= 12) ? date.getHours() : (date.getHours() - 12),
    minute: date.getMinutes(),
    id: (date.getHours() <= 12) ? `AM` : `PM`
  };
};

const createDeadlineTemplate = (card) => (
  `<fieldset class="card__date-deadline">
    ${createDeadlineInputTemlate(`date`, getDueDate(card).day + ` `
      + getDueDate(card).month)}
    ${createDeadlineInputTemlate(`time`, getDueDate(card).hour + `:`
      + getDueDate(card).minute + ` `
      + getDueDate(card).id)}
  </fieldset>`
);

const createRepeatToggleTemplate = (card) => (
  `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${card.repeatingDays.forEach((value) =>
    value ? `yes` : `no`)}</span>
  </button>`
);

const createRepeatDayInputTemplate = (card, day) => (
  `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day}-4"
    name="repeat"
    value="${day}"
    ${card.repeatingDays.get(day) ? `checked` : ``}
  />
  <label class="card__repeat-day" for="repeat-${day}-4"
    >${day}</label
  >`
);

const createRepeatDaysTemplate = (card) => {
  const block = Array.from(card.repeatingDays)
    .map((day) => createRepeatDayInputTemplate(card, day[0]))
    .join(``);

  return (
    `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${block}
      </div>
    </fieldset>`
  );
};

const createDatesTemplate = (card) => (
  `<div class="card__dates">
    ${createDeadlineToggleTemplate(card)}
    ${createDeadlineTemplate(card)}
    ${createRepeatToggleTemplate(card)}
    ${createRepeatDaysTemplate(card)}
  </div>`
);

const createColorTemplate = (card) => (color) => (
  `<input
    type="radio"
    id="color-${color}-4"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${(color === card.color) ? `checked` : ``}
  />
  <label
    for="color-${color}-4"
    class="card__color card__color--${color}"
    >${color}</label
  >`
);

const createColorsTemplate = (card) => {
  const block = COLORS
    .map(createColorTemplate(card))
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

const createPictureTemplate = (card) => (
  `<label class="card__img-wrap">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${card.picture}"
      alt="task picture"
      class="card__img"
    />
  </label>`
);

const createHashtagButtonTemplate = (tag) => (
  `<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="repeat"
      class="card__hashtag-hidden-input"
    />
    <button type="button" class="card__hashtag-name">
      #${tag}
    </button>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`
);

const createHashtagInputTemplate = () => (
  `<label>
    <input
      type="text"
      class="card__hashtag-input"
      name="hashtag-input"
      placeholder="Type new hashtag here"
    />
  </label>`
);

const createHashtagsTemplate = (card) => {
  const block = card.tags
    .map(createHashtagButtonTemplate)
    .join(``);

  return (
    `<div class="card__hashtag">
      <div class="card__hashtag-list">
        ${block}
      </div>
      ${createHashtagInputTemplate()}
    </div>`
  );
};

const createStatusButtonsTemplate = () => (
  `<div class="card__status-btns">
    <button class="card__save" type="submit">save</button>
    <button class="card__delete" type="button">delete</button>
  </div>`
);

const createCardTemplate = (card) => (
  `<article class="card card--edit card--yellow card--repeat">
    <form class="card__form" method="get">
      <div class="card__inner">
      ${createButtonsTemlate(card)}
      ${createColorBarTemplate()}
      ${createTextareaTemplate(card)}
       <div class="card__settings">
          <div class="card__details">
            ${createDatesTemplate(card)}
            ${createHashtagsTemplate(card)}
          </div>
          ${createPictureTemplate(card)}
          ${createColorsTemplate(card)}
        </div>
          ${createStatusButtonsTemplate()}
       </div>
    </form>
  </article>`
);

export const createCardsTemplate = (cards) => (
  cards
    .map(createCardTemplate)
    .join(``)
);
