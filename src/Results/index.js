import "./style.css";

export default class Results {
  constructor(data) {
    this.data = this.parseData(data);

    this.radarChart = new Chart("chart1", {
      type: "radar",
      data: this.data,
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
    });

    this.pieChart = new Chart("chart2", {
      type: "bar",
      data: this.data,
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
    });

    // Update the chart data
    this.update = function(data) {
      this.data = this.parseData(data);

      this.radarChart.data = this.data;
      this.radarChart.update();

      this.pieChart.data = this.data;
      this.pieChart.update();
    };
  }

  parseData(data) {
    const labels = [];
    const values = [];

    data.forEach(function(answer) {
      labels.push(answer.name);
      values.push(Number(answer.value));
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Domeinen",
          data: values,
          backgroundColor: "rgba(241, 185, 86, 0.5)",
          borderColor: "#f1b956",
          pointBackgroundColor: "#f1b956"
        }
      ]
    };
  }
}
