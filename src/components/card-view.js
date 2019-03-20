import {createCardTemplate} from '../templates/cards';
import BaseComponent from './base';

import {hasRepeatedDay} from '../utils';

export default class CardViewComponent extends BaseComponent {
  constructor(data, id) {
    super(data);
    this._id = id;

    this.setState({
      asDate: data.hasDate,
      isFavorite: data.isFavorite,
      isRepeated: hasRepeatedDay(data.repeatingDays)
    })

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
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
}
