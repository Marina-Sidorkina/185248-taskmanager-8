import {COLORS} from '../constants';
import ChartComponent from '../components/statistics';
import {createElement, generateRandomColor} from '../utils';
import {createCanvasColorsTemplate} from '../templates/canvas-colors';
import {createCanvasTagsTemplate} from '../templates/canvas-tags';

const boardContainerElement = document.querySelector(`.board`);
const statisticsElement = document.querySelector(`.statistic`);
const statisticsTagsElement = document.querySelector(`.statistic__tags-wrap`);
const statisticsColorsElement = document.querySelector(`.statistic__colors-wrap`);

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

export const getStatisticsByTags = (initialCardsList) => {
  resetCanvasElement(createCanvasTagsTemplate(), `.statistic__tags-wrap`);
  const tagsList = getAllTagsList(initialCardsList);
  const data = {
    ctx: document.querySelector(`.statistic__tags`),
    labelsArray: tagsList,
    dataArray: [],
    backgroundColor: tagsList.map(generateRandomColor),
    text: `TAGS`
  };
  tagsList.forEach((testTag, index) => {
    data.dataArray[index] = initialCardsList.filter((card) => {
      return Array.from(card.tags).some((tag) => tag === testTag);
    }).length;
  });
  return data;
};

export const getStatisticsByColors = (initialCardsList) => {
  resetCanvasElement(createCanvasColorsTemplate(), `.statistic__colors-wrap`);
  const data = {
    ctx: document.querySelector(`.statistic__colors`),
    labelsArray: COLORS,
    dataArray: [],
    backgroundColor: COLORS,
    text: `COLORS`
  };
  COLORS.forEach((testColor, index) => {
    data.dataArray[index] = initialCardsList.filter((card) => {
      return card.color === testColor;
    }).length;
  });
  return data;
};

export const onStatisticsControlOpen = (initialCardsList) => {
  const tagsChart = new ChartComponent(getStatisticsByTags(initialCardsList));
  const colorsChart = new ChartComponent(getStatisticsByColors(initialCardsList));
  boardContainerElement.classList.add(`visually-hidden`);
  statisticsElement.classList.remove(`visually-hidden`);
  statisticsTagsElement.classList.remove(`visually-hidden`);
  statisticsColorsElement.classList.remove(`visually-hidden`);
  tagsChart.render();
  colorsChart.render();
};

export const onStatisticsControlClose = () => {
  boardContainerElement.classList.remove(`visually-hidden`);
  statisticsElement.classList.add(`visually-hidden`);
  statisticsTagsElement.classList.add(`visually-hidden`);
  statisticsColorsElement.classList.add(`visually-hidden`);
};
