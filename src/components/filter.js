import {createFilterTemplate} from '../templates/filter';
import BaseComponent from './base';

export default class FilterComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this._onClick = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get template() {
    return createFilterTemplate(this._data);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  _onFilterClick(evt) {
    return typeof this._onClick === `function` && this._onClick(evt);
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelectorAll(`.filter__input`)
        .forEach((element) => {
          element.addEventListener(`click`, this._onFilterClick);
        });
    }
  }

  removeListeners() {
    if (this._element) {
      this
        ._element
        .querySelectorAll(`.filter__input`)
        .forEach((element) => {
          element.removeEventListener(`click`, this._onFilterClick);
        });
    }
  }
}
