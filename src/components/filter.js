import {createFilterTemplate} from '../templates/filter';
import {createElement} from '../utils';

export default class Filter {
  constructor(data) {
    this._data = data;

    this._onChange = null;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  get element() {
    return this._element;
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

  _bind() {
    if (this._element) {
      this
        ._element
        .querySelectorAll(`.filter__input`)
        .forEach((element) => {
          element.addEventListener(`change`, this._onFilterChange);
        });
    }
  }

  render() {
    this._element = createElement(this.template);
    this._bind();
    return this._element;
  }
}
