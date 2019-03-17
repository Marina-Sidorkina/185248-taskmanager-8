import {COLORS} from '../constants';
import {makeArrayFromObject} from '../utils';

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

const createButtonTemlate = (isFavorite, value) => (
  `<button type="button" class="card__btn card__btn--${value}
    ${(!isFavorite && value === `favorites`) ? `card__btn--disabled` : ``}">
    ${value}
  </button>`
);

const createButtonsTemlate = (isFavorite) => {
  const block = STATUSES
    .map((value) => (
      createButtonTemlate(isFavorite, value)
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

const createDeadlineToggleTemplate = (isDate) => (
  `<button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${isDate ? `yes` : `no`}</span>
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

const createDeadlineTemplate = (card, isDate) => (
  `<fieldset class="card__date-deadline" ${!isDate && `disabled`}>
    ${createDeadlineInputTemlate(`date`, getDueDate(card).day + ` `
      + getDueDate(card).month)}
    ${createDeadlineInputTemlate(`time`, getDueDate(card).hour + `:`
      + getDueDate(card).minute + ` `
      + getDueDate(card).id)}
  </fieldset>`
);

const createRepeatToggleTemplate = (isRepeated) => (
  `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">
      ${isRepeated ? `yes` : `no`}
    </span>
  </button>`
);

const createRepeatDayInputTemplate = (card, day, id) => (
  `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day}-${id}"
    name="repeat"
    value="${day}"
    ${card.repeatingDays[day] ? `checked` : ``}
  />
  <label class="card__repeat-day" for="repeat-${day}-${id}"
    >${day}</label
  >`
);

const createRepeatDaysTemplate = (card, isRepeated, id) => {
  const block = makeArrayFromObject(card.repeatingDays)
    .map((day) => createRepeatDayInputTemplate(card, day[0], id))
    .join(``);

  return (
    `<fieldset class="card__repeat-days" ${!isRepeated ? `disabled` : ``}>
      <div class="card__repeat-days-inner">
        ${block}
      </div>
    </fieldset>`
  );
};

const createDatesTemplate = (card, isRepeated, isDate, id) => (
  `<div class="card__dates">
    ${createDeadlineToggleTemplate(isDate)}
    ${createDeadlineTemplate(card, isDate)}
    ${createRepeatToggleTemplate(isRepeated)}
    ${createRepeatDaysTemplate(card, isRepeated, id)}
  </div>`
);

const createColorTemplate = (card, id) => (color) => (
  `<input
    type="radio"
    id="color-${color}-${id}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${(color === card.color) ? `checked` : ``}
  />
  <label
    for="color-${color}-${id}"
    class="card__color card__color--${color}"
    >${color}</label
  >`
);

const createColorsTemplate = (card, id) => {
  const block = COLORS
    .map(createColorTemplate(card, id))
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
      value="${tag}"
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
  const block = Array.from(card.tags)
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

export const createCardTemplate = (card, isFavorite, isRepeated, isDate, id) => (
  `<article class="card ${card.color ? `card--${card.color}` : `card--black`} ${isRepeated ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
      ${createButtonsTemlate(isFavorite)}
      ${createColorBarTemplate()}
      ${createTextareaTemplate(card)}
       <div class="card__settings">
          <div class="card__details">
            ${createDatesTemplate(card, isRepeated, isDate, id)}
            ${createHashtagsTemplate(card)}
          </div>
          ${createPictureTemplate(card)}
          ${createColorsTemplate(card, id)}
        </div>
          ${createStatusButtonsTemplate()}
       </div>
    </form>
  </article>`
);

export const createCardEditTemplate = (card, isFavorite, isRepeated, isDate, id) => (
  `<article class="card card--edit ${card.color ? `card--${card.color}` : `card--black`} ${isRepeated ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
      ${createButtonsTemlate(isFavorite)}
      ${createColorBarTemplate()}
      ${createTextareaTemplate(card)}
       <div class="card__settings">
          <div class="card__details">
            ${createDatesTemplate(card, isRepeated, isDate, id)}
            ${createHashtagsTemplate(card)}
          </div>
          ${createPictureTemplate(card)}
          ${createColorsTemplate(card, id)}
        </div>
          ${createStatusButtonsTemplate()}
       </div>
    </form>
  </article>`
);
