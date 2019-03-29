import {COLORS} from '../constants';
import ChartComponent from '../components/statistics';
import {createElement, generateRandomColor} from '../utils';
import {createCanvasColorsTemplate} from '../templates/canvas-colors';
import {createCanvasTagsTemplate} from '../templates/canvas-tags';
import flatpickr from 'flatpickr';
import moment from 'moment';

const statisticsElement = document.querySelector(`.statistic`);
const statisticsTagsElement = document.querySelector(`.statistic__tags-wrap`);
const statisticsColorsElement = document.querySelector(`.statistic__colors-wrap`);
const statisticsStartElement = document.querySelector(`.statistic__period-input-start`);
const statisticsEndElement = document.querySelector(`.statistic__period-input-end`);
const statisticsContainerElement = document.
    querySelector(`.statistic-input-wrap`);
let timeStart;
let timeEnd;

const getAllTagsList = (initialCardsList) => {
  const tags = new Set();
  initialCardsList.forEach((card) => {
    card.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  return Array.from(tags);
};

const resetCanvasElement = (template, element) => {
  const canvasWrapElement = document.querySelector(element);
  canvasWrapElement.innerHTML = ``;
  canvasWrapElement.appendChild(createElement(template));
};

const filterInitialCardsList = (initialCardsList) => {
  return initialCardsList.filter((card) => {
    return card.isDone
      && moment(card.dueDate).format(`D MMMM`) >= statisticsStartElement.value
      && moment(card.dueDate).format(`D MMMM`) <= statisticsEndElement.value;
  });
};

const setInitialPeriod = () => {
  statisticsStartElement.value = moment(Date.now())
      .startOf(`week`).add(1, `days`).format(`D MMMM`);
  statisticsEndElement.value = moment(Date.now())
      .endOf(`week`).add(1, `days`).format(`D MMMM`);
};

export const getStatisticsByTags = (initialCardsList) => {
  resetCanvasElement(createCanvasTagsTemplate(), `.statistic__tags-wrap`);
  const filteredCardsList = filterInitialCardsList(initialCardsList);
  const tagsList = getAllTagsList(filteredCardsList);
  const data = {
    ctx: document.querySelector(`.statistic__tags`),
    labelsArray: tagsList,
    dataArray: [],
    backgroundColor: tagsList.map(generateRandomColor),
    text: `TAGS`
  };
  tagsList.forEach((testTag, index) => {
    data.dataArray[index] = filteredCardsList.filter((card) => {
      return Array.from(card.tags).some((tag) => tag === testTag);
    }).length;
  });
  return data;
};

export const getStatisticsByColors = (initialCardsList) => {
  resetCanvasElement(createCanvasColorsTemplate(), `.statistic__colors-wrap`);
  const filteredCardsList = filterInitialCardsList(initialCardsList);
  const data = {
    ctx: document.querySelector(`.statistic__colors`),
    labelsArray: COLORS,
    dataArray: [],
    backgroundColor: COLORS,
    text: `COLORS`
  };
  COLORS.forEach((testColor, index) => {
    data.dataArray[index] = filteredCardsList.filter((card) => {
      return card.color === testColor;
    }).length;
  });
  return data;
};

const getFulfilledTasksAmount = (tasks) => {
  const amount = filterInitialCardsList(tasks).length;
  statisticsStartElement.placeholder = statisticsStartElement.value;
  statisticsEndElement.placeholder = statisticsEndElement.value;
  document.querySelector(`.statistic__task-found`).innerHTML = amount;
};

const renderNewChart = (initialCardsList) => {
  let tagsChart = new ChartComponent(getStatisticsByTags(initialCardsList));
  let colorsChart = new ChartComponent(getStatisticsByColors(initialCardsList));
  tagsChart.render();
  colorsChart.render();
};

export const onStatisticsControlOpen = (initialCardsList) => {
  document.querySelector(`.board`).classList.add(`visually-hidden`);
  statisticsElement.classList.remove(`visually-hidden`);
  statisticsTagsElement.classList.remove(`visually-hidden`);
  statisticsColorsElement.classList.remove(`visually-hidden`);
  setInitialPeriod();
  getFulfilledTasksAmount(initialCardsList);
  renderNewChart(initialCardsList);
  statisticsContainerElement.querySelectorAll(`input`)
    .forEach((input) => {
      input.addEventListener(`change`, () => {
        renderNewChart(initialCardsList);
        getFulfilledTasksAmount(initialCardsList);
      });
    });
  timeStart = flatpickr(statisticsStartElement,
      {altInput: true, altFormat: `j F`, dateFormat: `j F`, maxDate: statisticsEndElement.value, onClose: () => {
        timeEnd.set(`minDate`, statisticsStartElement.value);
      }});
  timeEnd = flatpickr(statisticsEndElement,
      {altInput: true, altFormat: `j F`, dateFormat: `j F`, minDate: statisticsStartElement.value, onClose: () => {
        timeStart.set(`maxDate`, statisticsEndElement.value);
      }});
};

export const onStatisticsControlClose = () => {
  document.querySelector(`.board`).classList.remove(`visually-hidden`);
  statisticsElement.classList.add(`visually-hidden`);
  statisticsTagsElement.classList.add(`visually-hidden`);
  statisticsColorsElement.classList.add(`visually-hidden`);
  timeStart.destroy();
  timeEnd.destroy();
  timeStart = null;
  timeEnd = null;
};
setInitialPeriod();
