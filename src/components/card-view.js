import {createCardTemplate} from '../templates/cards';

export default class Card {
  constructor(data) {
    this._data = data;
    this._element = null;

    this._state = {
      isDone: data.isDone,
      isFavorite: data.isFavorite
    };

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  get element() {
    return this._element;
  }

  get isRepeated() {
    return Array.from(this._data.repeatingDays).some(([_, isRepeatable]) => isRepeatable);
  }

  get template() {
    return createCardTemplate(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  _bind() {
    if (this._element) {
      this
        ._element
        .querySelector(`.card__btn--edit`)
        .addEventListener(`click`, this._onEditButtonClick);
    }
  }

  _unbind() {
    this
      ._element
      .querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  render() {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = this.template;
    this._element = newElement.firstChild;
    this._bind();
    return this._element;
  }

  unrender() {
    this._unbind();
    this._element = null;
  }
}
