import {createCardTemplate} from '../templates/cards';
import Initial from './initial';

export default class Card extends Initial {
  constructor(data) {
    super(data);

    this._state = {
      isDone: data.isDone,
      isFavorite: data.isFavorite,
      isRepeated: data.repeatingDays
    };

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  get isRepeated() {
    return Array.from(this._data.repeatingDays).some(([_, isRepeatable]) => isRepeatable);
  }

  get template() {
    return createCardTemplate(this._data, this._state.isFavorite, this._state.isRepeated);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.card__btn--edit`)
        .addEventListener(`click`, this._onEditButtonClick);
    }
  }

  removeListeners() {
    this
      ._element
      .querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }
}
