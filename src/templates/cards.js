const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const STATUSES = [`edit`, `archive`, `favorites`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const createButtonTemlate = (status, value) => (
  `<button type="button" class="card__btn card__btn--${status}">
    ${value}
  </button>`
);

const createButtonsTemlate = (card) => {
  const block = STATUSES
    .map((value, index) => (
      createButtonTemlate(card.controls[index], value)
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
        name="text">${card.text}</textarea>
    </label>
  </div>`
);

const createDeadlineToggleTemplate = (card) => (
  `<button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${card.deadlineToggleValue}</span>
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

const createDeadlineTemlate = (card) => (
  `<fieldset class="card__date-deadline">
    ${createDeadlineInputTemlate(`date`, card.date)}
    ${createDeadlineInputTemlate(`time`, card.time)}
  </fieldset>`
);

const createRepeatToggleTemplate = (card) => (
  `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${card.repeatStatus}</span>
  </button>`
);

const createRepeatDayInputTemplate = (day) => (
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

const createRepeatDaysTemplate = () => {
  const block = DAYS
    .map((day) => createRepeatDayInputTemplate(day))
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
    ${createDeadlineTemlate(card)}
    ${createRepeatToggleTemplate(card)}
    ${createRepeatDaysTemplate()}
  </div>`
);

const createColorTemplate = (color) => (
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

const createColorsTemplate = () => {
  const block = COLORS
    .map((color) => createColorTemplate(color))
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

const createImageTemplate = (card) => (
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

const createHashtagButtonTemplate = (value) => (
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
  const block = card.hashtags
    .map((hashtag) => createHashtagButtonTemplate(hashtag))
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
          ${createImageTemplate(card)}
          ${createColorsTemplate()}
        </div>
          ${createStatusButtonsTemplate()}
       </div>
    </form>
  </article>`
);

const createNumberRange = (limit) => (
  Array.from(new Array(limit), (_, i) => i)
);

export const createCardsTemplate = (limit, card) => (
  createNumberRange(limit)
    .map(() => createCardTemplate(card))
    .join(``)
);
