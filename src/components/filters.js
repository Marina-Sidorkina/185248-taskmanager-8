import {createFiltersTemplate} from '../templates/filter';
import {hasRepeatedDay} from '../utils';
import BaseComponent from './base';
import FilterComponent from './filter';

export default class FiltersComponent extends BaseComponent {
  constructor(data) {
    super(data);
  }

  get template() {
    return createFiltersTemplate();
  }

  set onSelect(fn) {
    this._onSelect = fn;
  }

  render() {
    const element = super.render();
    this.renderFilters(element);
    return element;
  }

  _getFilteredCards() {
    return {
      'filter__all': (cardsList) => cardsList,
      'filter__overdue': (cardsList) => cardsList
          .filter((card) => card.dueDate < Date.now()),
      'filter__today': (cardsList) => cardsList
          .filter((card) => card.dueDate === Date.now()),
      'filter__repeating': (cardsList) => cardsList
          .filter((card) => hasRepeatedDay(card.repeatingDays))
    };
  }

  renderFilters(containerElement) {
    this.components = this._data.map((filter) => {
      const component = new FilterComponent(filter);

      component.onClick = (filterId) => {
        if (typeof this._onSelect === `function`) {
          // TODO ???
          this._onSelect(this._getFilteredCards()[filterId]());
        }
      };
      return component;
    });
    this.components.forEach((component) => {
      containerElement.appendChild(component.render()[0]);
      containerElement.appendChild(component.render()[1]);
    });
  }
}
