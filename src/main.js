import {generateFilterData} from './data/filter';
import {generateCards} from './mocks/cards';
import {getFilteredCards} from './utils';
import FiltersComponent from './components/filters';
import CardsComponent from './components/cards';
import StatisticsComponent from './components/statistics';

const CARD_LIMIT = 7;
const FILTERS = generateFilterData();
const statisticsControlElement = document.querySelector(`#control__statistic`);
const taskControlElement = document.querySelector(`#control__task`);
const mainElement = document.querySelector(`main`);
const filterReferenceElement = mainElement.children[2];
const statisticsReferenceElement = document.querySelector(`.result`);
const filtersComponent = new FiltersComponent(FILTERS);
let cardsList = generateCards(CARD_LIMIT);
const statisticsComponent = new StatisticsComponent(cardsList);

const addCards = (cards) => {
  const cardsComponent = new CardsComponent(cards);
  mainElement.insertAdjacentElement(`beforeend`, cardsComponent.render());
  cardsComponent.onChange = ((updatedCards) => {
    cardsList = updatedCards;
  });
};

filtersComponent.onSelect = (id) => {
  mainElement.removeChild(mainElement.lastChild);
  const filteredCardsList = getFilteredCards(cardsList)[id]();
  addCards(filteredCardsList);
};

statisticsControlElement.addEventListener(`change`, () => {
  document.querySelector(`.board`).classList.add(`visually-hidden`);
  document.querySelector(`.statistic`).classList.remove(`visually-hidden`);
  statisticsComponent.update(cardsList);
});

taskControlElement.addEventListener(`change`, () => {
  document.querySelector(`.board`).classList.remove(`visually-hidden`);
  document.querySelector(`.statistic`).classList.add(`visually-hidden`);
});

mainElement.insertBefore(filtersComponent.render(), filterReferenceElement);
mainElement.insertBefore(statisticsComponent.render(), statisticsReferenceElement);
addCards(cardsList);
