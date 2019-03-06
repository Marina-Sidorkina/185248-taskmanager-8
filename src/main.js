import {generateRandomNumber} from './utils';
import {createFilterTemplate} from './templates/filter';
import {generateCards} from './mocks/cards';
import {Card} from './components/card';
import {CardEdit} from './components/card-edit';

const CARD_LIMIT = 7;

const addFilterClickEventListener = () => {
  document.querySelectorAll(`.filter__input`).forEach((element) => {
    element.addEventListener(`click`, () => {
      boardElement.innerHTML = ``;
      addCards(generateCards(generateRandomNumber(0, CARD_LIMIT)), boardElement);
    });
  });
};

const addOnEditMethod = (card, cardEdit, container) => {
  card.onEdit = () => {
    cardEdit.render();
    container.replaceChild(cardEdit.element, card.element);
    card.unrender();
  };
};

const addOnSubmitMethod = (card, cardEdit, container) => {
  cardEdit.onSubmit = () => {
    card.render();
    container.replaceChild(card.element, cardEdit.element);
    cardEdit.unrender();
  };
};

const addCards = (cards, container) => {
  cards.forEach((card) => {
    const template = new Card(card);
    const templateEdit = new CardEdit(card);
    container.appendChild(template.render());
    addOnEditMethod(template, templateEdit, container);
    addOnSubmitMethod(template, templateEdit, container);
  });
};

const boardElement = document.querySelector(`.board__tasks`);
const filterElement = document.querySelector(`.main__filter`);

filterElement.innerHTML = createFilterTemplate();

addCards(generateCards(CARD_LIMIT), boardElement);
addFilterClickEventListener();
