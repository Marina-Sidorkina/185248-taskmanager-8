import {generateRandomNumber} from './utils';
import {generateCards} from './mocks/cards';

import CardView from './components/card-view';
import CardEdit from './components/card-edit';
import Filter from './components/filter';

const CARD_LIMIT = 7;
const FILTER_NAMES = [`ALL`, `OVERDUE`, `TODAY`, `FAVORITES`, `Repeating`, `Tags`, `ARCHIVE`];

const boardElement = document.querySelector(`.board__tasks`);
const filterElement = document.querySelector(`.main__filter`);

const addCards = (limit) => {
  generateCards(limit).forEach((data) => {
    const componentEdit = new CardEdit(data);
    const componentView = new CardView(data);
    const elementEdit = componentEdit.render();
    const elementView = componentView.render();
    componentView.onEdit = () => {
      boardElement.replaceChild(elementEdit, elementView);
      componentEdit.onSubmit = () => {
        boardElement.replaceChild(elementView, elementEdit);
      };
    };
    boardElement.appendChild(elementView);
  });
};

const addFilter = () => {
  FILTER_NAMES.forEach((name) => {
    const componentFilter = new Filter(name);
    const elementFilter = componentFilter.render();
    const elementFilterInput = elementFilter.input;
    const elementFilterLabel = elementFilter.label;
    filterElement.appendChild(elementFilterInput);
    filterElement.appendChild(elementFilterLabel);
    componentFilter.onChange = () => {
      boardElement.innerHTML = ``;
      addCards(generateRandomNumber(0, CARD_LIMIT));
    };
  });
};

addFilter();
addCards(CARD_LIMIT);
