import {generateRandomNumber} from './utils';
import {generateCards} from './mocks/cards';
import {generateFilterData} from './data/filter';

import CardViewComponent from './components/card-view';
import CardEditComponent from './components/card-edit';
import FilterComponent from './components/filter';

const CARD_LIMIT = 7;

const boardElement = document.querySelector(`.board__tasks`);
const mainElement = document.querySelector(`main`);

const addCards = (limit) => {
  generateCards(limit).forEach((data) => {
    const editComponent = new CardEditComponent(data);
    const viewComponent = new CardViewComponent(data);
    viewComponent.onEdit = () => {
      editComponent.render();
      boardElement.replaceChild(editComponent.element, viewComponent.element);
      viewComponent.unrender();
    };
    editComponent.onSubmit = () => {
      viewComponent.render();
      boardElement.replaceChild(viewComponent.element, editComponent.element);
      editComponent.unrender();
    };
    boardElement.appendChild(viewComponent.render());
  });
};

const addFilter = (data) => {
  const filterComponent = new FilterComponent(data);
  const filterElement = filterComponent.render();
  const nextElement = mainElement.children[2];
  mainElement.insertBefore(filterElement, nextElement);
  filterComponent.onChange = () => {
    boardElement.innerHTML = ``;
    addCards(generateRandomNumber(0, CARD_LIMIT));
  };
};

addFilter(generateFilterData());
addCards(CARD_LIMIT);
