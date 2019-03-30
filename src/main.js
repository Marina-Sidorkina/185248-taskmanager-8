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
let cardsList = generateCards(CARD_LIMIT);
let cardsComponent;

const filtersComponent = new FiltersComponent(FILTERS);
const statisticsComponent = new StatisticsComponent(cardsList);

const addCards = (cards) => {
  cardsComponent = new CardsComponent(cards);
  cardsComponent.onChange = ((updatedCards) => {
    cardsList = updatedCards;
  });
  mainElement.insertAdjacentElement(`beforeend`, cardsComponent.render());
};

filtersComponent.onSelect = (id) => {
  mainElement.removeChild(mainElement.lastChild);
  const filteredCardsList = getFilteredCards(cardsList)[id]();
  cardsComponent.unrender();
  addCards(filteredCardsList);
};

statisticsControlElement.addEventListener(`change`, () => {
  mainElement.removeChild(mainElement.lastChild);
  cardsComponent.unrender();
  statisticsComponent.render();
  mainElement.insertBefore(statisticsComponent._element,
      statisticsReferenceElement);
});

taskControlElement.addEventListener(`change`, () => {
  mainElement.removeChild(statisticsComponent._element);
  statisticsComponent.unrender();
  addCards(cardsList);
});

mainElement.insertBefore(filtersComponent.render(), filterReferenceElement);
addCards(cardsList);
