import "./style.css";

export default class Questions {
  constructor(selector, data) {
    this.data = data;
    this.form = document.querySelector(selector);

    data.forEach(this.addQuestion, this);
  }

  addQuestion(questionData, index) {
    const question = document.createElement("div");
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
