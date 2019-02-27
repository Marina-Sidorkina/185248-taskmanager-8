const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const STATUSES = [`edit`, `archive`, `favorites`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
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

const changeTimeFormat = (hours) => (hours <= 12) ? {time: hours, id: `AM`} : {time: hours - 12, id: `PM`};

const createDeadlineTemplate = (card) => (
  `<fieldset class="card__date-deadline">
    ${createDeadlineInputTemlate(`date`, new Date(card.dueDate).getDate() + ` ` + MONTHS[new Date(card.dueDate).getMonth()])}
    ${createDeadlineInputTemlate(`time`, changeTimeFormat(new Date(card.dueDate).getHours()).time + `:` + new Date(card.dueDate).getMinutes() + ` ` + changeTimeFormat(new Date(card.dueDate).getHours()).id)}
  </fieldset>`
);

const createRepeatToggleTemplate = (card) => (
  `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${DAYS.some((day) => card.repeatingDays[day] === true) ? `yes` : `no`}</span>
  </button>`
);

const createRepeatDayInputTemplate = (card, day) => (
  `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day}-4"
    name="repeat"
    value="${day}"
    ${card.repeatingDays[day] ? `checked` : ``}
  />
  <label class="card__repeat-day" for="repeat-${day}-4"
    >${day}</label
  >`
);

const createRepeatDaysTemplate = (card) => {
  const block = DAYS
    .map((day) => createRepeatDayInputTemplate(card, day))
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

const createColorTemplate = (card, color) => (
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
    .map((color) => createColorTemplate(card, color))
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
  const block = card.tags
    .map((tag) => createHashtagButtonTemplate(tag))
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
  cards.map((card) => createCardTemplate(card)).join(``)
);
