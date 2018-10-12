"use strict";

// Load data and initialize
$.getJSON("data.json", function(data) {
  $(document).ready(function() {
    init(data);
  });
});

function init(data) {
  var q = new Questions("#questions", data);
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

    question.appendChild(options);
    this.form.appendChild(question);
  }
}
