import {createCardTemplate} from '../templates/cards';
import {createCardDivElement} from '../utils';

export class Card {
  constructor(card) {
    this._title = card.title;
    this._deadlineToggleValue = card.deadlineToggleValue;
    this._dueDate = card.dueDate;
    this._tags = card.tags;
    this._picture = card.picture;
    this._color = card.color;
    this._repeatingDays = card.repeatingDays;

    this._element = null;
    this._onEdit = null;

    this._state = {
      isDone: card.isDone,
      isFavorite: card.isFavorite
    };
  }

  _isRepeated() {
    return Array.from(this._repeatingDays).some(([_, isRepeatable]) => isRepeatable);
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return createCardTemplate(this);
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
          .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
          .removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    this._element = createCardDivElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
