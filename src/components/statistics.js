import {createStatisticsTemplate} from '../templates/statistics';
import {createCanvasColorsTemplate} from '../templates/canvas-colors';
import {createCanvasTagsTemplate} from '../templates/canvas-tags';
import {generateRandomColor, getAllTagsList,
  getCardsAmountByColors, getCardsAmountByTags,
  resetCanvasElement, filterInitialCardsListByPeriod} from '../utils';
import BaseComponent from './base';
import ChartComponent from './chart';
import {COLORS} from '../constants';
import flatpickr from 'flatpickr';
import moment from 'moment';

export default class StatisticsComponent extends BaseComponent {
  constructor(data) {
    super(data);
  }

  get template() {
    return createStatisticsTemplate();
  }

  _getStatisticsByColors(newData, container, startElement, endElement) {
    resetCanvasElement(createCanvasColorsTemplate(), `.statistic__colors-wrap`, container);
    const filteredCardsList = filterInitialCardsListByPeriod(newData, startElement.value, endElement.value);
    const data = {
      ctx: document.querySelector(`.statistic__colors`),
      labelsArray: COLORS,
      dataArray: [],
      backgroundColor: COLORS,
      text: `COLORS`
    };
    getCardsAmountByColors(filteredCardsList, data.dataArray);
    return data;
  }

  _getStatisticsByTags(newData, container, startElement, endElement) {
    resetCanvasElement(createCanvasTagsTemplate(), `.statistic__tags-wrap`, container);
    const filteredCardsList = filterInitialCardsListByPeriod(newData, startElement.value, endElement.value);
    const tagsList = getAllTagsList(filteredCardsList);
    const data = {
      ctx: document.querySelector(`.statistic__tags`),
      labelsArray: tagsList,
      dataArray: [],
      backgroundColor: tagsList.map(generateRandomColor),
      text: `TAGS`
    };
    getCardsAmountByTags(filteredCardsList, tagsList, data.dataArray);
    return data;
  }

  _renderNewCharts(data, container, startElement, endElement) {
    const tagsChart = new ChartComponent(this._getStatisticsByTags(data, container, startElement, endElement));
    const colorsChart = new ChartComponent(this._getStatisticsByColors(data, container, startElement, endElement));
    tagsChart.render();
    colorsChart.render();

  }

  _setInitialPeriod(startElement, endElement) {
    startElement.value = moment(Date.now())
        .startOf(`week`).add(1, `days`).format(`D MMMM`);
    endElement.value = moment(Date.now())
        .endOf(`week`).add(1, `days`).format(`D MMMM`);
  }

  _getFulfilledTasksAmount(data, container, startElement, endElement) {
    const amount = filterInitialCardsListByPeriod(data, startElement.value, endElement.value).length;
    startElement.placeholder = startElement.value;
    endElement.placeholder = endElement.value;
    container.querySelector(`.statistic__task-found`).innerHTML = amount;
  }

  _setFlatpickr(startElement, endElement) {
    this.timeStart = flatpickr(startElement,
        {altInput: true, altFormat: `j F`, dateFormat: `j F`, maxDate: endElement.value, onClose: () => {
          this.timeEnd.set(`minDate`, startElement.value);
        }});
    this.timeEnd = flatpickr(endElement,
        {altInput: true, altFormat: `j F`, dateFormat: `j F`, minDate: startElement.value, onClose: () => {
          this.timeStart.set(`maxDate`, endElement.value);
        }});
  }

  _createListeners(data, element, startElement, endElement) {
    element.querySelectorAll(`.statistic-input-wrap input`)
      .forEach((input) => {
        input.addEventListener(`change`, () => {
          this._renderNewCharts(data, element, startElement, endElement);
          this._getFulfilledTasksAmount(data, element, startElement, endElement);
        });
      });
  }

  render() {
    const element = super.render();
    const startElement = element.querySelector(`.statistic__period-input-start`);
    const endElement = element.querySelector(`.statistic__period-input-end`);
    this._setInitialPeriod(startElement, endElement);
    this._getFulfilledTasksAmount(this._data, element, startElement, endElement);
    window.addEventListener(`load`, () => {
      this._renderNewCharts(this._data, element, startElement, endElement);
    });
    this._createListeners(this._data, element, startElement, endElement);
    this._setFlatpickr(startElement, endElement);
    return element;
  }

  update(newData) {
    this._data = newData;
    const startElement = this._element
      .querySelector(`.statistic__period-input-start`);
    const endElement = this
      ._element.querySelector(`.statistic__period-input-end`);
    this._renderNewCharts(this._data,
        this._element, startElement, endElement);
    this._getFulfilledTasksAmount(this._data,
        this._element, startElement, endElement);
    this._createListeners(this._data,
        this._element, startElement, endElement);
  }
}
