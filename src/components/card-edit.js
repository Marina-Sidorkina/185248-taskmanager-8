import {createCardEditTemplate} from '../templates/cards';
import BaseComponent from './base';
import getCardDataPattern from '../patterns/card';
import getCardMapper from '../mappers/card';
import {resetDisabilityStatus} from '../utils';
import {resetYesNoStatus} from '../utils';
import {makeArrayFromObject} from '../utils';
import {checkRepeatingDays} from '../utils';

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
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    resetDisabilityStatus(this._element.querySelector(`.card__date-deadline`), this._state.isDate);
    resetYesNoStatus(this._element.querySelector(`.card__date-status`), this._state.isDate);
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this._element.classList.toggle(`card--repeat`);
    resetDisabilityStatus(this._element.querySelector(`.card__repeat-days`), this._state.isRepeated);
    resetYesNoStatus(this._element.querySelector(`.card__repeat-status`), this._state.isRepeated);
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
      .addEventListener(`click`, this._onChangeDate);
    this.
    _element.querySelector(`.card__repeat-toggle`)
    .addEventListener(`click`, this._onChangeRepeated);
  }

  removeListeners() {
    this
      ._element
      .querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this.
      _element.querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onChangeDate);
    this.
      _element.querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._data.title = data.title;
    this._data.tags = data.tags;
    this._data.color = data.color;
    this._data.repeatingDays = data.repeatingDays;
    this._data.dueDate = data.dueDate;
  }
}
