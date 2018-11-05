import "jquery-serializejson";
import "./style.css";

export default class Questions {
  constructor(selector, data) {
    this.data = data;
    this.element = document.querySelector(selector);
    this.element.classList.add("questions");

    data.forEach(this.addSection, this);
  }

  addSection(sectionData, sectionIndex) {
    const section = document.createElement("section");
    section.setAttribute("class", "section");

    const title = document.createElement("h3");
    title.innerHTML = sectionData.title;
    section.appendChild(title);

    section.innerHTML += `<input type="hidden"
                                 name="groups[${sectionIndex}][title]"
                                 value="${sectionData.title}">`;

    sectionData.questions.forEach((questionTitle, questionIndex) => {
      const questionElement = this.addQuestion(
        questionTitle,
        questionIndex,
        sectionData.title,
        sectionIndex
      );
      section.appendChild(questionElement);
    });

    this.element.appendChild(section);
  }

  addQuestion(questionTitle, questionIndex, sectionTitle, sectionIndex) {
    const question = document.createElement("div");
    question.setAttribute("class", "question");

    const title = document.createElement("h4");
    title.innerHTML = questionTitle;
    question.appendChild(title);

    question.innerHTML += `<input type="hidden"
                                 name="groups[${sectionIndex}][questions][${questionIndex}][question]"
                                 value="${questionTitle}">`;

    const options = document.createElement("div");
    options.setAttribute("class", "options");

    const name = `groups[${sectionIndex}][questions][${questionIndex}][answer]:number`;

    // Add options
    for (let optionIndex = 5; optionIndex--; ) {
      const value = optionIndex + 1;
      const id = `option-${sectionIndex}-${questionIndex}-${optionIndex}`;

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
}
