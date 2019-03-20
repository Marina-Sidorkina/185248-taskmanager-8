import {createCardTemplate} from '../templates/cards';
import BaseComponent from './base';

export default class CardViewComponent extends BaseComponent {
  constructor(data, id) {
    super(data);
    this._id = id;
    this._state = Object.assign({}, this._state, {
      hasDate: data.dueDate,
      isFavorite: data.isFavorite,
      isRepeated: Object.entries(data.repeatingDays).some(([_, isRepeatable]) => isRepeatable)
    });

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  get isRepeated() {
    return Array.from(this._data.repeatingDays).some(([_, isRepeatable]) => isRepeatable);
  }

  get template() {
    return createCardTemplate(
        this._data,
        this._state.isFavorite,
        this._state.isRepeated,
        this._state.hasDate,
        this._id
    );
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

  update(data) {
    this._data.title = data.title;
    this._data.tags = data.tags;
    this._data.color = data.color;
    this._data.repeatingDays = data.repeatingDays;
  }
}
