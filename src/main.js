import {generateRandomNumber} from './utils';
import {generateCards} from './mocks/cards';
import {generateFilterData} from './data/filter';

import CardView from './components/card-view';
import CardEdit from './components/card-edit';
import Filter from './components/filter';

const CARD_LIMIT = 7;

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

const addFilter = (data) => {
  const componentFilter = new Filter(data);
  const elementFilter = componentFilter.render();
  elementFilter.forEach((element) => {
    filterElement.appendChild(element);
  });
  componentFilter.onClick = () => {
    boardElement.innerHTML = ``;
    addCards(generateRandomNumber(0, CARD_LIMIT));
  };
};

addFilter(generateFilterData());
addCards(CARD_LIMIT);
