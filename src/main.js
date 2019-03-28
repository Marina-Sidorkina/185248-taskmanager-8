import {onStatisticsControlOpen, onStatisticsControlClose} from './lib/statistics';
import {generateFilterData} from './data/filter';
import {generateCards} from './mocks/cards';
import {getFilteredCards} from './utils';
import FiltersComponent from './components/filters';
import CardsComponent from './components/cards';

const CARD_LIMIT = 7;
const FILTERS = generateFilterData();
const statisticsControlElement = document.querySelector(`#control__statistic`);
const taskControlElement = document.querySelector(`#control__task`);
const mainElement = document.querySelector(`main`);
const filterReferenceElement = mainElement.children[2];
const filtersComponent = new FiltersComponent(FILTERS);
let cardsList = generateCards(CARD_LIMIT);

mainElement.insertBefore(filtersComponent.render(), filterReferenceElement);

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

statisticsControlElement.addEventListener(`change`,
    () => onStatisticsControlOpen(cardsList));
taskControlElement.addEventListener(`change`, () => {
  onStatisticsControlClose();
});
addCards(cardsList);
