
import {onStatisticsControlOpen, onStatisticsControlClose} from './lib/statistics';
import {generateFilterData} from './data/filter';
import {generateCards} from './mocks/cards';
import FiltersComponent from './components/filters';
// import StatisticsComponent from './components/statistics';
import CardsComponent from './components/cards';


const statisticsControlElement = document.querySelector(`#control__statistic`);
const taskControlElement = document.querySelector(`#control__task`);
const mainElement = document.querySelector(`main`);
const filterReferenceElement = mainElement.children[2];


const CARD_LIMIT = 7;
const CARDS = generateCards(CARD_LIMIT);
const FILTERS = generateFilterData();
const cardsComponent = new CardsComponent(CARDS);
const filtersComponent = new FiltersComponent(FILTERS);

mainElement.insertAdjacentElement(`beforeend`, cardsComponent.render());
mainElement.insertBefore(filtersComponent.render(), filterReferenceElement);

cardsComponent.onChange = ((updatedCards) => {
  console.log(updatedCards);
});

//
// const statisticsComponent = new StatisticsComponent(cardsComponent._data);
/*
filtersComponent.onChange((filter) => {
  const updatedCards = filter(cardsComponent.getData());
  cardsComponent.updateData(updatedCards);

  // statisticsComponent.updateData(updatedCards);
});

cardsComponent.onChange((updatedCards) => {
  filtersComponent.updateData(updatedCards);
  // statisticsComponent.updateData(updatedCards);
});
*/


filtersComponent.onSelect = (callback) => {
  // TODO callback is not a function ??
  mainElement.removeChild(mainElement.lastChild);
  const filteredCardsList = callback(cardsComponent._data);
  cardsComponent._data = Object.assign({}, filteredCardsList);
};

statisticsControlElement.addEventListener(`change`,
    () => onStatisticsControlOpen(cardsComponent._data));
taskControlElement.addEventListener(`change`, () => {
  onStatisticsControlClose();
});
