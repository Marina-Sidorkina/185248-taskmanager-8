import flatpickr from 'flatpickr';
import moment from 'moment';

import {COLORS} from '../constants';
import BaseComponent from './base';
import getCardDataPattern from '../patterns/card';
import {createCardEditTemplate, addNewHashtag} from '../templates/cards';
import {markNotRepeatedDays, hasRepeatedDay, checkHashtagValidity, getNotReapeatedDays} from '../utils';
import {createPreview} from '../picture';

import 'flatpickr/dist/flatpickr.css';

export default class CardEditComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this.setState({
      hasDate: data.hasDate,
      isFavorite: data.isFavorite,
      isRepeated: hasRepeatedDay(data.repeatingDays)
    });

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this._onRepeatChange = this._onRepeatChange.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
    this._onHashtagEnter = this._onHashtagEnter.bind(this);
    this._onHashtagDelete = this._onHashtagDelete.bind(this);
    this._onHashtagInvalid = this._onHashtagInvalid.bind(this);
    this._onPictureChange = this._onPictureChange.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  _resetDisabilityStatus(element, value) {
    if (value) {
      element.removeAttribute(`disabled`);
    } else {
      element.setAttribute(`disabled`, `disabled`);
    }
  }

  _resetYesNoStatus(element, value) {
    element.textContent = value ? `yes` : `no`;
  }

  _removeCardColor(element, array) {
    for (const color of array) {
      const cls = `card--` + color;
      element.classList.remove(cls);
    }
  }

  _onDateChange() {
    this.setState({
      hasDate: !this._state.hasDate
    });
    this._data.hasDate = this._state.hasDate;
    this._resetDisabilityStatus(this._element.querySelector(`.card__date-deadline`), this._state.hasDate);
    this._resetYesNoStatus(this._element.querySelector(`.card__date-status`), this._state.hasDate);
  }

  _onRepeatChange() {
    this.setState({
      isRepeated: !this._state.isRepeated
    });
    this._data.isRepeated = this._state.isRepeated;
    this._element.classList.toggle(`card--repeat`);
    this._resetDisabilityStatus(this._element.querySelector(`.card__repeat-days`), this._state.isRepeated);
    this._resetYesNoStatus(this._element.querySelector(`.card__repeat-status`), this._state.isRepeated);
  }

  _onColorChange(evt) {
    const color = `card--` + evt.target.value;
    this._removeCardColor(this._element, COLORS);
    this._element.classList.add(color);
  }

  _onHashtagInvalid(evt) {
    const {isValid, error} = checkHashtagValidity(evt, this._data.tags);
    if (isValid) {
      evt.target.setCustomValidity(``);
    } else {
      evt.target.setCustomValidity(error);
    }
  }

  _onHashtagEnter(evt) {
    const element = this._element.querySelector(`.card__hashtag-input`);
    if (evt.keyCode === 13 && element.checkValidity()) {
      const length = this._data.tags.size;
      element.setCustomValidity(``);
      event.preventDefault();
      this._data.tags.add(evt.target.value.replace(/#/, ``));
      addNewHashtag(this._element, length, this._data.tags.size, evt.target.value);
      this.
        _element.querySelectorAll(`.card__hashtag-delete`).forEach((elem) => {
          elem.removeEventListener(`click`, this._onHashtagDelete);
        });
      this.
          _element.querySelectorAll(`.card__hashtag-delete`).forEach((elem) => {
            elem.addEventListener(`click`, this._onHashtagDelete);
          });
      evt.target.value = ``;
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

    createPreview(pictureInput, picturePreview);
  }

  _getDefaultTime() {
    const date = new Date(this._data.dueDate);
    return {
      hours: parseInt(moment(date).format(`h`), 10),
      minutes: parseInt(moment(date).format(`mm`), 10)
    };
  }

  _saveDefaultDueDate(hours, minutes) {
    const date = new Date(this._data.dueDate);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const defaultTime = this._getDefaultTime();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = Object.assign(this._processForm(formData), {isRepeated: this._state.isRepeated}, {hasDate: this._state.hasDate});
    if (!this._element.querySelector(`.card__time`).value) {
      newData.dueDate = this._saveDefaultDueDate(defaultTime.hours, defaultTime.minutes);
    }
    this.update(newData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return createCardEditTemplate(
        this._data,
        this._state
    );
  }

  _createCardMapper(target) {
    return {
      hashtag: (value) => (target.tags.add(value)),
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      repeat: (value) => (target.repeatingDays[value] = true),
      date: (value) => (target.dueDate = `${value}, 2019, `),
      time: (value) => (target.dueDate = Date.parse(target.dueDate + value))
    };
  }

  _processForm(formData) {
    const entry = getCardDataPattern;
    const taskEditMapper = this._createCardMapper(entry);
    let array = [];
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      getNotReapeatedDays(property, value, array);
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }
    markNotRepeatedDays(entry.repeatingDays, array);
    return entry;
  }

  createListeners() {
    this._element
      .querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);

    this._element
      .querySelector(`.card__date-deadline-toggle`)
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
      _element.querySelectorAll(`.card__hashtag-input`).forEach((element) => {
        element.addEventListener(`input`, this._onHashtagInvalid);
      });
    this.
      _element.querySelector(`.card__img-input`)
      .addEventListener(`change`, this._onPictureChange);

    if (this._state.hasDate) {
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
      _element.querySelectorAll(`.card__hashtag-input`).forEach((element) => {
        element.removeEventListener(`input`, this._onHashtagInvalid);
      });
    this.
      _element.querySelector(`.card__img-input`)
      .addEventListener(`change`, this._onPictureChange);
  }
}
