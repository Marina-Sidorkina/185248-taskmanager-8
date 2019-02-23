const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const STATUSES = [`edit`, `archive`, `favorites`];
const COLOR_BUTTONS = [`black`, `yellow`, `blue`, `green`, `pink`];

const createBtnTemlate = (status, value) => (
  `<button type="button" class="card__btn card__btn--${status}">
    ${value}
  </button>`
);

const createBtnsTemlate = (controls) => {
  const block = STATUSES
    .map((value, index) => (
      createBtnTemlate(controls[index], value)
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

const createTextareaTemplate = (text) => (
  `<div class="card__textarea-wrap">
    <label>
      <textarea
        class="card__text"
        placeholder="Start typing your text here..."
        name="text">${text}</textarea>
    </label>
  </div>`
);

const createDeadlineToggleTemplate = (setting) => (
  `<button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${setting}</span>
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

const createDeadlineTemlate = (dateSetting, timeSetting) => (
  `<fieldset class="card__date-deadline">
    ${createDeadlineInputTemlate(`date`, dateSetting)}
    ${createDeadlineInputTemlate(`time`, timeSetting)}
  </fieldset>`
);

const createRepeatToggleTemplate = (status) => (
  `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${status}</span>
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

const createDatesTemplate = (deadlineToggleValue, date, time, repeatStatus) => (
  `<div class="card__dates">
    ${createDeadlineToggleTemplate(deadlineToggleValue)}
    ${createDeadlineTemlate(date, time)}
    ${createRepeatToggleTemplate(repeatStatus)}
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
  const block = COLOR_BUTTONS
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

const createImageTemplate = (image) => (
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

const createHashtagBtnTemplate = (value) => (
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

const createHashtagsTemplate = (hashtags) => {
  const block = hashtags
    .map((hashtag) => createHashtagBtnTemplate(hashtag))
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

const createStatusBtnsTemplate = () => (
  `<div class="card__status-btns">
    <button class="card__save" type="submit">save</button>
    <button class="card__delete" type="button">delete</button>
  </div>`
);

const createTemplate = (object) => (
  `<article class="card card--edit card--yellow card--repeat">
    <form class="card__form" method="get">
      <div class="card__inner">
      ${createBtnsTemlate(object.controls)}
      ${createColorBarTemplate()}
      ${createTextareaTemplate(object.text)}
       <div class="card__settings">
          <div class="card__details">
            ${createDatesTemplate(object.deadlineToggleValue, object.date, object.time, object.repeatStatus)}
            ${createHashtagsTemplate(object.hashtags)}
          </div>
          ${createImageTemplate(object.image)}
          ${createColorsTemplate()}
        </div>
          ${createStatusBtnsTemplate()}
       </div>
    </form>
  </article>`
);

const createNumberRange = (limit) => (
  Array.from(new Array(limit), (_, i) => i)
);

const createCardsTemplate = (limit, object) => (
  createNumberRange(limit)
    .map(() => createTemplate(object))
    .join(``)
);

export {createCardsTemplate};
