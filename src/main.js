import {generateRandomNumber} from './utils';
import {generateCards} from './mocks/cards';
import {generateFilterData} from './data/filter';

import CardView from './components/card-view';
import CardEdit from './components/card-edit';
import Filter from './components/filter';

const CARD_LIMIT = 7;

const boardElement = document.querySelector(`.board__tasks`);
const filterNavElement = document.querySelector(`.main__filter`);

const addCards = (limit) => {
  generateCards(limit).forEach((data) => {
    const editComponent = new CardEdit(data);
    const viewComponent = new CardView(data);
    const editElement = editComponent.render();
    const viewElement = viewComponent.render();
    viewComponent.onEdit = () => {
      boardElement.replaceChild(editElement, viewElement);
      editComponent.onSubmit = () => {
        boardElement.replaceChild(viewElement, editElement);
      };
    };
    boardElement.appendChild(viewElement);
  });
};

const addFilter = (data) => {
  const filterComponent = new Filter(data);
  const filterElement = filterComponent.render();
  filterElement.forEach((element) => {
    filterNavElement.appendChild(element);
  });
  filterComponent.onClick = () => {
    boardElement.innerHTML = ``;
    addCards(generateRandomNumber(0, CARD_LIMIT));
  };
};

addFilter(generateFilterData());
addCards(CARD_LIMIT);
