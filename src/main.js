import {generateRandomNumber} from './utils';
import {createFilterTemplate} from './templates/filter';
import {createCardsTemplate} from './templates/cards';
import {generateCards} from './mocks/cards';

const CARD_LIMIT = 7;

const addFilterClickEventListener = () => {
  document.querySelectorAll(`.filter__input`).forEach((element) => {
    element.addEventListener(`click`, () => {
      boardElement.innerHTML = createCardsTemplate(generateCards(generateRandomNumber(0, CARD_LIMIT)));
    });
  });
};

const boardElement = document.querySelector(`.board__tasks`);
const filterElement = document.querySelector(`.main__filter`);

filterElement.innerHTML = createFilterTemplate();
boardElement.innerHTML = createCardsTemplate(generateCards(CARD_LIMIT));

addFilterClickEventListener();
