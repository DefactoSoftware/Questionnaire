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

    const title = document.createElement("h3");
    title.innerHTML = questionData.title;
    question.appendChild(title);

    const options = document.createElement("div");
    options.setAttribute("class", "options");

    // Add options
    for (let i = 5; i--; ) {
      const value = i + 1;
      const id = "q" + index + i;

      const input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("value", value);
      input.setAttribute("name", questionData.title);
      input.setAttribute("id", id);
      options.appendChild(input);

      const label = document.createElement("label");
      label.setAttribute("for", id);

      const option = document.createElement("div");
      option.setAttribute("class", "option");
      option.innerHTML = value;
      label.appendChild(option);

      options.appendChild(label);
    }

    // Default option
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("value", 0);
    input.setAttribute("name", questionData.title);
    input.checked = true;
    options.appendChild(input);

    question.appendChild(options);
    this.form.appendChild(question);
  }
}
