/*
import {hasRepeatedDay} from './utils';
import {onStatisticsControlOpen, onStatisticsControlClose} from '.lib//statistics';
import {generateFilterData} from './data/filter';
import FilterComponent from './components/filter';
*/
import {generateCards} from './mocks/cards';
import CardsComponent from './components/cards';

/*
const statisticsControlElement = document.querySelector(`#control__statistic`);
const taskControlElement = document.querySelector(`#control__task`);
const mainElement = document.querySelector(`main`);
*/

const CARD_LIMIT = 7;
const cards = generateCards(CARD_LIMIT);
const cardsComponent = new CardsComponent(cards);

document.querySelector(`main`)
  .insertAdjacentElement(`beforeend`, cardsComponent.render());


cardsComponent.onChange = ((updatedCards) => {
  console.log(updatedCards);
});

/*
const filtersComponent = new FiltersComponent(params);
const statisticsComponent = new StatisticsComponent(cards);

filtersComponent.onChange((filter) => {
  const updatedCards = filter(cardsComponent.getData());
  cardsComponent.updateData(updatedCards);

  // statisticsComponent.updateData(updatedCards);
});

cardsComponent.onChange((updatedCards) => {
  filtersComponent.updateData(updatedCards);
  // statisticsComponent.updateData(updatedCards);
});

const getFilteredCards = () => ({
  'filter__all': (cards) => cards,
  'filter__overdue': (cards) => cards
      .filter((card) => card.dueDate < Date.now()),
  'filter__today': (cards) => cards
      .filter((card) => card.dueDate === Date.now()),
  'filter__repeating': (cards) => cards
      .filter((card) => hasRepeatedDay(card.repeatingDays))
});

const addFilter = (data) => {
  const filterComponent = new FilterComponent(data);
  const filterElement = filterComponent.render();
  const nextElement = mainElement.children[2];
  mainElement.insertBefore(filterElement, nextElement);

  filterComponent.onSelect = (filterId) => {
    //
  };

  filterComponent.onClick = (evt) => {
    boardElement.innerHTML = ``;
    const filteredCardsList = getFilteredCards()[evt.target.id](initialCardsList);
    addCards(filteredCardsList);
  };
};

addFilter(generateFilterData());
addCards(initialCardsList);
statisticsControlElement.addEventListener(`change`,
    () => onStatisticsControlOpen(initialCardsList));
taskControlElement.addEventListener(`change`, () => {
  onStatisticsControlClose();
});
*/
