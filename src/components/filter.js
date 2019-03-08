import {generateRandomNumber} from '../utils';
import {createFilterTemplate} from '../templates/filter';

export default class Filter {
  constructor(name) {
    this._name = name;
    this._status = name === `TODAY` ? `checked` : ``;
    this._number = generateRandomNumber(1, 15);
    this._element = null;
    this._onInputChange = this._onInputChange.bind(this);
  }

  get template() {
    return createFilterTemplate(this);
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  _onInputChange() {
    return typeof this._onChange === `function` && this._onChange();
  }

  _bind() {
    this
      ._element.input
      .addEventListener(`change`, this._onInputChange);
  }

  render() {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = this.template;
    this._element = {
      input: newElement.firstChild,
      label: newElement.lastChild
    };
    this._bind();
    return this._element;
  }
}
