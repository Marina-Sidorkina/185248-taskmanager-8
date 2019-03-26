import {hasRepeatedDay} from './utils';
import {onStatisticsControlOpen, onStatisticsControlClose} from './statistics';
import {generateCards} from './mocks/cards';
import {generateFilterData} from './data/filter';
import CardViewComponent from './components/card-view';
import CardEditComponent from './components/card-edit';
import FilterComponent from './components/filter';

const CARD_LIMIT = 7;
const boardElement = document.querySelector(`.board__tasks`);
const statisticsControlElement = document.querySelector(`#control__statistic`);
const taskControlElement = document.querySelector(`#control__task`);
const mainElement = document.querySelector(`main`);
let initialCardsList = generateCards(CARD_LIMIT);

const addCards = (cards) => {
  cards.forEach((data, index) => {
    const taskData = Object.assign(data, {id: index});

    const editComponent = new CardEditComponent(taskData);
    const viewComponent = new CardViewComponent(taskData);

    viewComponent.onEdit = () => {
      boardElement.replaceChild(editComponent.render(), viewComponent.element);
      viewComponent.unrender();
    };

    editComponent.onSubmit = (newData) => {
      initialCardsList.forEach((card, id) => {
        if (card.id === index) {
          initialCardsList[id] = Object.assign({}, initialCardsList[id], newData);
        }
      });
      viewComponent.update(newData);
      viewComponent.setState({
        isRepeated: hasRepeatedDay(newData.repeatingDays),
        hasDate: newData.hasDate
      });
      boardElement.replaceChild(viewComponent.render(), editComponent.element);
      editComponent.unrender();
    };

    editComponent.onDelete = () => {
      initialCardsList.forEach((card, id) => {
        if (card.id === editComponent._data.id) {
          initialCardsList[id] = null;
        }
      });
      initialCardsList = initialCardsList.filter((card) => card !== null);
      boardElement.removeChild(editComponent.element);
      editComponent.unrender();
    };

    boardElement.appendChild(viewComponent.render());
  });
};

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
