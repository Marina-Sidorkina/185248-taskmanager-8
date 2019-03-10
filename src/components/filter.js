import {createFilterTemplate} from '../templates/filter';
import BaseComponent from './base';

export default class FilterComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this._onChange = null;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  get template() {
    return createFilterTemplate(this._data);
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  _onFilterChange() {
    return typeof this._onChange === `function` && this._onChange();
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelectorAll(`.filter__input`)
        .forEach((element) => {
          element.addEventListener(`change`, this._onFilterChange);
        });
    }
  }

  removeListeners() {
    if (this._element) {
      this
        ._element
        .querySelectorAll(`.filter__input`)
        .forEach((element) => {
          element.removeEventListener(`change`, this._onFilterChange);
        });
    }
  }
}
