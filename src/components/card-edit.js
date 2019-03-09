import {createCardEditTemplate} from '../templates/cards';
import Card from './card-view';

export default class CardEdit extends Card {
  constructor(data) {
    super(data);
    this._element = null;

    this._state = {
      isDone: data.isDone,
      isFavorite: data.isFavorite
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
    return createCardEditTemplate(this._data, this._state.isFavorite);
  }

  _bind() {
    this
      ._element
      .querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
  }

  _unbind() {
    this
      ._element
      .querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
  }
}
