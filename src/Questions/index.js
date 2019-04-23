import "jquery-serializejson";
import helpers from "../helpers";
import "./style.css";

export default class Questions {
  constructor(selector, data) {
    this.data = data;
    this.element = document.querySelector(selector);
    this.element.classList.add("questions");

    data.forEach(this.addGroup, this);
  }

  addGroup(groupData, groupIndex) {
    const group = document.createElement("div");
    group.setAttribute("class", "group");

    const title = document.createElement("h3");
    title.innerHTML = groupData.title;
    group.appendChild(title);

    group.innerHTML += `<input type="hidden"
                                 name="groups[${groupIndex}][title]"
                                 value="${groupData.title}">`;

    groupData.questions.forEach((questionTitle, questionIndex) => {
      const questionElement = this.addQuestion(
        questionTitle,
        questionIndex,
        groupData.title,
        groupIndex
      );
      group.appendChild(questionElement);
    });

    this.element.appendChild(group);
  }

  addQuestion(questionTitle, questionIndex, groupTitle, groupIndex) {
    const question = document.createElement("div");
    question.setAttribute("class", "question");

    const title = document.createElement("p");
    title.innerHTML = "Bij onze organisatie " + questionTitle;
    question.appendChild(title);

    question.innerHTML += `<input type="hidden"
                                 name="groups[${groupIndex}][questions][${questionIndex}][question]"
                                 value="${questionTitle}">`;

    const options = document.createElement("div");
    options.setAttribute("class", "options");

    const name = `groups[${groupIndex}][questions][${questionIndex}][answer]`;

    // Add options
    for (let optionIndex = 5; optionIndex--; ) {
      const value = optionIndex + 1;
      const id = `option-${groupIndex}-${questionIndex}-${optionIndex}`;

      options.innerHTML += this.createOptionHTML(name, value, id);
    }

    // Default option (checked by default)
    options.innerHTML += `<input type="radio" name="${name}" value="0" checked>`;

    question.appendChild(options);

    return question;
  }

  createOptionHTML(name, value, id) {
    return `
      <input type="radio" name="${name}" value="${value}" id="${id}">
      <label for="${id}">
        <div class="option">${value}</div>
      </label>
    `;
  }

  serializeJSON() {
    return $(this.element).serializeJSON({ useIntKeysAsArrayIndex: true });
  }

  getAverageGroupResults = data => helpers.getAverageGroupResults(data);
}
