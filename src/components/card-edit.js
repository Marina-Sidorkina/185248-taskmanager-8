import {COLORS} from '../constants';
import BaseComponent from './base';
import getCardDataPattern from '../patterns/card';
import getCardMapper from '../mappers/card';
import {createCardEditTemplate} from '../templates/cards';
import {resetDisabilityStatus} from '../utils';
import {resetYesNoStatus} from '../utils';
import {makeArrayFromObject} from '../utils';
import {checkRepeatingDays} from '../utils';
import {removeCardColor} from '../utils';
import {addNewHashtag} from '../utils';
import {hashtagCheck} from '../constants';
import {onChange} from '../picture';
import flatpickr from 'flatpickr';

export default class CardEditComponent extends BaseComponent {
  constructor(data, id) {
    super(data, id);

    this._state = Object.assign({}, this._state, {
      isDate: data.dueDate,
      isFavorite: data.isFavorite,
      isRepeated: makeArrayFromObject(data.repeatingDays).some(([_, isRepeatable]) => isRepeatable)
    });

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this._onRepeatChange = this._onRepeatChange.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
    this._onHashtagEnter = this._onHashtagEnter.bind(this);
    this._onHashtagDelete = this._onHashtagDelete.bind(this);
    this._onPictureChange = this._onPictureChange.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  _onDateChange() {
    this._state.isDate = !this._state.isDate;
    resetDisabilityStatus(this._element.querySelector(`.card__date-deadline`), this._state.isDate);
    resetYesNoStatus(this._element.querySelector(`.card__date-status`), this._state.isDate);
  }

  _onRepeatChange() {
    this._state.isRepeated = !this._state.isRepeated;
    this._element.classList.toggle(`card--repeat`);
    resetDisabilityStatus(this._element.querySelector(`.card__repeat-days`), this._state.isRepeated);
    resetYesNoStatus(this._element.querySelector(`.card__repeat-status`), this._state.isRepeated);
  }

  _onColorChange(evt) {
    const color = `card--` + evt.target.value;
    removeCardColor(this._element, COLORS);
    this._element.classList.add(color);
  }

  _onHashtagEnter(evt) {
    const element = this._element.querySelector(`.card__hashtag-input`);
    if (evt.keyCode === 13) {
      if (!hashtagCheck.HASH.test(element.value)) {
        element.setCustomValidity(`Хештег должен начинаться с символа #`);
      } else if (hashtagCheck.HASH_ONLY.test(element.value)) {
        element.setCustomValidity(`Хештег не может состоять только из символа #`);
      } else if (hashtagCheck.SPACE.test(element.value)) {
        element.setCustomValidity(`Хештег не может содержать знак пробела`);
      } else if (element.value.length > 8 || element.value.length < 3) {
        element.setCustomValidity(`Один хештег не может содержать более 8 и менее 3 символов,
          включая символ #`);
      } else if (this._data.tags.size === 5) {
        element.setCustomValidity(`Нельзя указывать более пяти хештегов`);
      } else {
        element.setCustomValidity(``);
        event.preventDefault();
        addNewHashtag(this._element);
        this._data.tags.add(evt.target.value.replace(/#/, ``));
        evt.target.value = ``;
      }
    }
  }

  _onHashtagDelete(evt) {
    const element = evt.target.parentNode;
    const hashtag = element.querySelector(`input`).value;
    this._data.tags.delete(hashtag);
    this._element.querySelector(`.card__hashtag-list`).removeChild(element);
  }

  _onPictureChange() {
    const pictureInput = this._element.querySelector(`.card__img-input`);
    const picturePreview = this._element.querySelector(`.card__img`);
    onChange(pictureInput, picturePreview);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    this._data.isDate = this._state.isDate;
    this._data.isRepeated = this._state.isRepeated;
    this.update(newData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get isRepeated() {
    return Array.from(this._data.repeatingDays).some(([_, isRepeatable]) => isRepeatable);
  }

  get template() {
    return createCardEditTemplate(
        this._data,
        this._state.isFavorite,
        this._state.isRepeated,
        this._state.isDate,
        this._id
    );
  }

  _processForm(formData) {
    const entry = getCardDataPattern;
    const taskEditMapper = getCardMapper(entry);
    let array = [];
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (property === `repeat`) {
        array.push(value);
      }
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }
    checkRepeatingDays(entry.repeatingDays, array);
    return entry;
  }

  createListeners() {
    this
      ._element
      .querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this.
      _element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onDateChange);
    this.
    _element.querySelector(`.card__repeat-toggle`)
    .addEventListener(`click`, this._onRepeatChange);
    this.
    _element.querySelectorAll(`.card__color-input`)
      .forEach((input) => input.addEventListener(`click`, this._onColorChange));
    this.
      _element.querySelector(`.card__hashtag-input`)
      .addEventListener(`keypress`, this._onHashtagEnter);
    this.
      _element.querySelectorAll(`.card__hashtag-delete`).forEach((element) => {
        element.addEventListener(`click`, this._onHashtagDelete);
      });
    this.
      _element.querySelector(`.card__img-input`)
      .addEventListener(`change`, this._onPictureChange);

    if (this._state.isDate) {
      flatpickr(this._element.querySelector(`.card__date`), {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(this._element.querySelector(`.card__time`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }
  }

  removeListeners() {
    this
      ._element
      .querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this.
      _element.querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onDateChange);
    this.
      _element.querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onRepeatChange);
    this.
      _element.querySelectorAll(`.card__color-input`)
      .forEach((input) => input.removeEventListener(`click`, this._onColorChange));
    this.
      _element.querySelector(`.card__hashtag-input`)
      .addEventListener(`keypress`, this._onHashtagEnter);
    this.
      _element.querySelectorAll(`.card__hashtag-delete`).forEach((element) => {
        element.addEventListener(`click`, this._onHashtagDelete);
      });
    this.
      _element.querySelector(`.card__img-input`)
      .addEventListener(`change`, this._onPictureChange);
  }

  update(data) {
    this._data.title = data.title;
    this._data.tags = data.tags;
    this._data.color = data.color;
    this._data.repeatingDays = data.repeatingDays;
    this._data.dueDate = data.dueDate;
  }
}
