import qs from "qs";
import helpers from "../helpers";
import "./style.css";

export default class Results {
  constructor(selector, data) {
    // Parse data string (assuming it's a querystring)
    if (typeof data === "string") {
      data = Results.parseQueryString(data);
    }

    // Parse groups data string (assuming it's JSON)
    // This is the case when submitting stringified json
    if (typeof data.groups === "string") {
      data.groups = JSON.parse(data.groups);
    }

    // Need to calculate group average?
    const needGroupAverageConvertion = Array.isArray(data.groups[0].questions);

    // Calculate group average if not already done
    if (needGroupAverageConvertion) {
      data.groups = Results.getAverageGroupResults(data.groups);
    }

    function SortByValue(x, y) {
      return y.value - x.value;
    }

    data.groups.sort(SortByValue);
    this.data = this.parseData(data);
    this.element = document.querySelector(selector);
    this.element.classList.add("results");
    this.charts = [];

    Results.chartOptions.forEach(this.renderChart, this);
  }

  renderChart(options) {
    options.data = this.data;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("class", "chart");
    this.element.appendChild(canvas);

    const chart = new Chart(canvas, options);
    this.charts.push(chart);
  }

  update(data) {
    this.data = this.parseData(data);

    this.charts.forEach(chart => {
      chart.data = this.data;
      chart.update();
    });
  }

  parseData(data) {
    const labels = [];
    const values = [];

    data.groups.forEach(answer => {
      // data.forEach(answer => {
      labels.push(answer.name);
      values.push(Number(answer.value));
    });

    return {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: "rgba(241, 185, 86, 0.5)",
          borderColor: "#f1b956",
          pointBackgroundColor: "#f1b956"
        }
      ]
    };
  }

  static parseQueryString = str => qs.parse(str, { ignoreQueryPrefix: true });

  static getAverageGroupResults = data => helpers.getAverageGroupResults(data);

  static chartOptions = [
    {
      type: "radar",
      options: {
        legend: {
          display: false
        },
        scale: {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            max: 5
          }
        }
      }
    },
    {
      type: "horizontalBar",
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                max: 5
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                autoSkip: false
              }
            }
          ]
        }
      }
    }
  ];
}
