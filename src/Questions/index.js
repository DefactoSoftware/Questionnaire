import "./style.css";

export default class Questions {
  constructor(selector, data) {
    this.element = document.querySelector(selector);
    this.data = data;

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

    const name = questionData.title;

    // Add options
    for (let i = 5; i--; ) {
      const value = i + 1;
      const id = "option" + index + i;

      options.innerHTML += this.createOptionHTML(name, value, id);
    }

    // Default option (checked by default)
    options.innerHTML += `<input type="radio" name="${name}" value="0" checked>`;

    question.appendChild(options);
    this.element.appendChild(question);
  }

  createOptionHTML(name, value, id) {
    return `
      <input type="radio" name="${name}" value="${value}" id="${id}">
      <label for="${id}">
        <div class="option">${value}</div>
      </label>
    `;
  }
}
