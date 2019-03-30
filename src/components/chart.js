import Chart from 'chart.js';
import BaseCompoentn from './base';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {createCanvasTemplate} from '../templates/canvas';

export default class ChartComponent extends BaseCompoentn {
  constructor(data) {
    super(data);
  }

  get template() {
    return createCanvasTemplate();
  }

  get chartSetting() {
    return {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: this._data.labelsArray,
        datasets: [{
          data: this._data.dataArray,
          backgroundColor: this._data.backgroundColor
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            }
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15
        },
        title: {
          display: true,
          text: `DONE BY: ${this._data.text}`,
          fontSize: 16,
          fontColor: `#000000`
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13
          }
        }
      }
    };
  }

  render() {
    const element = super.render();
    element.classList.add(this._data.canvasCls);
    this._chart = new Chart(element, this.chartSetting);
    return element;
  }

  unrender() {
    this._chart = null;
    super.unrender();
  }
}
