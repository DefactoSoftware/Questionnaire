"use strict";

// Load data
$.getJSON("data.json", function(data) {
  $(document).ready(function() {
    init(data);
  });
});

// Initialize
function init(data) {
  var questons = new Questions("#questions", data);
  var formData = $(questons.form).serializeArray();
  var results = new Results(formData);

  function updateChart() {
    formData = $(questons.form).serializeArray();
    results.update(formData);
  }

  questons.form.addEventListener("change", updateChart);
}

// Questions
function Questions(selector, data) {
  this.data = data;
  this.form = document.querySelector(selector);

  // Add questons
  data.questions.forEach(addQuestion, this);

  function addQuestion(questionData, index) {
    var question = document.createElement("div");
    question.setAttribute("class", "question");

    var title = document.createElement("h3");
    title.innerHTML = questionData.title;
    question.appendChild(title);

    var options = document.createElement("div");
    options.setAttribute("class", "options");

    // Add options
    for (var i = 5; i--; ) {
      var value = i + 1;
      var id = "q" + index + i;

      var input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("value", value);
      input.setAttribute("name", questionData.title);
      input.setAttribute("id", id);
      options.appendChild(input);

      var label = document.createElement("label");
      label.setAttribute("for", id);

      var option = document.createElement("div");
      option.setAttribute("class", "option");
      option.innerHTML = value;
      label.appendChild(option);

      options.appendChild(label);
    }

    // Default option
    var input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("value", 0);
    input.setAttribute("name", questionData.title);
    input.checked = true;
    options.appendChild(input);

    question.appendChild(options);
    this.form.appendChild(question);
  }
}

// Results
function Results(data) {
  var chartData = parseData(data);

  this.radarChart = new Chart("chart", {
    type: "radar",
    data: chartData,
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
      },
      scaleLabel: {
        padding: 50
      }
    }
  });

  // Update the chart data
  this.update = function(data) {
    this.radarChart.data = parseData(data);
    this.radarChart.update();
  };

  function parseData(data) {
    var labels = [];
    var values = [];

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
