import {generateRandomNumber} from './utils.js';
import createFilterTemplate from './filter.js';
import createCardListTemplate from './card.js';

const CARD_LIMIT = 7;

const card = {
  controls: [`edit`, `archive`, `disabled`],
  text: `Here is a card with filled data`,
  image: `img/sample-img.jpg`,
  hashtags: [`repeat`, `cinema`, `entertaiment`],
  deadlineToggleValue: `yes`,
  date: `23 September`,
  time: `11:15 PM`,
  repeatStatus: `yes`
};

const addFilterClickEventListener = () => {
  document.querySelectorAll(`.filter__input`).forEach((element) => {
    element.addEventListener(`click`, () => {
      boardElement.innerHTML = createCardListTemplate(generateRandomNumber(0, CARD_LIMIT), card);
    });
  });
};

const boardElement = document.querySelector(`.board__tasks`);
const filterElement = document.querySelector(`.main__filter`);

filterElement.innerHTML = createFilterTemplate();
boardElement.innerHTML = createCardListTemplate(CARD_LIMIT, card);

addFilterClickEventListener();
