import {createCardEditTemplate} from '../templates/cards';
import Initial from './initial';

export default class CardEdit extends Initial {
  constructor(data) {
    super(data);

    this._state = {
      isDone: data.isDone,
      isFavorite: data.isFavorite,
      isRepeated: data.repeatingDays
    };

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return createCardEditTemplate(this._data, this._state.isFavorite, this._state.isRepeated);
  }

  createListeners() {
    this
      ._element
      .querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
  }

  removeListeners() {
    this
      ._element
      .querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
  }
}
