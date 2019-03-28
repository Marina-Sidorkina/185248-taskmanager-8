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

  _onFilterClick() {
    return typeof this._onClick === `function` && this._onClick(this._element[0].id);
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .forEach((item) => {
          item.addEventListener(`click`, this._onFilterClick);
        });
    }
  }

  removeListeners() {
    if (this._element) {
      this
        ._element
        .forEach((item) => {
          item.removeEventListener(`click`, this._onFilterClick);
        });
    }
  }

  render() {
    if (!this._state.isRendered) {
      const newElement = document.createElement(`div`);
      newElement.innerHTML = this.template;
      this._element = Array.from(newElement.children).map((element) => element);
      this.createListeners();
      this._state.isRendered = true;
    }
    return this._element;
  }
}
