import {createCardEditTemplate} from '../templates/cards';
import {createCardDivElement} from '../utils';

export class CardEdit {
  constructor(card) {
    this._title = card.title;
    this._deadlineToggleValue = card.deadlineToggleValue;
    this._dueDate = card.dueDate;
    this._tags = card.tags;
    this._picture = card.picture;
    this._color = card.color;
    this._repeatingDays = card.repeatingDays;

    this._element = null;
    this._onSubmit = null;

    this._state = {
      isDone: card.isDone,
      isFavorite: card.isFavorite
    };
  }

  _isRepeated() {
    return Array.from(this._repeatingDays).some(([_, isRepeatable]) => isRepeatable);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    return createCardEditTemplate(this);
  }

  bind() {
    this._element.querySelector(`.card__form`)
        .addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__form`)
        .removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
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
