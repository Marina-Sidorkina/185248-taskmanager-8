import {createFiltersTemplate} from '../templates/filter';

export default class Filter {
  constructor(data) {
    this._data = data;

    this._onClick = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get element() {
    return this._element;
  }

  get template() {
    return createFiltersTemplate(this._data);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  _onFilterClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _bind() {
    if (this._element) {
      this
        ._element
        .forEach((item) => {
          item.addEventListener(`click`, this._onFilterClick);
        });
    }
  }

  render() {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = this.template;
    this._element = Array.from(newElement.children).map((element) => element);
    this._bind();
    return this._element;
  }
}
