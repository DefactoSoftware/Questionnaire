import "./style.css";

export default class Results {
  constructor(selector, data) {
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

    data.forEach(answer => {
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
      type: "bar",
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                max: 5
              }
            }
          ],
          xAxes: [
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
