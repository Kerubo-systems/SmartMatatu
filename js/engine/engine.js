window.SmartMatatu = window.SmartMatatu || {};

window.SmartMatatu.Engine = {
  surveyState: {
    currentQuestionId: "age",
    history: [],
    isPastTensePath: false
  },

  renderSingleChoice(question, savedAnswer) {
    const wrapper = document.createElement("fieldset");
    wrapper.className = "option-list";
    wrapper.setAttribute("aria-label", question.text);
    
    question.options.forEach((option) => {
      const optionId = `${question.id}__${option.value}`;
      const label = document.createElement("label");
      label.className = "option";
      label.setAttribute("for", optionId);
      
      const input = document.createElement("input");
      input.type = "radio";
      input.name = question.id;
      input.id = optionId;
      input.value = option.value;
      input.className = "option__input sr-only";
      
      if (savedAnswer === option.value) {
        input.checked = true;
        label.classList.add("option--selected");
      }
      
      input.addEventListener("change", () => {
        wrapper.querySelectorAll(".option").forEach((el) => el.classList.remove("option--selected"));
        label.classList.add("option--selected");
      });
      
      const customMarker = document.createElement("span");
      customMarker.className = "option__marker";
      customMarker.setAttribute("aria-hidden", "true");
      
      const text = document.createElement("span");
      text.className = "option__label";
      text.textContent = option.label;
      
      label.append(input, customMarker, text);
      wrapper.appendChild(label);
    });

    if (question.allowOther) {
      const otherInput = document.createElement("input");
      otherInput.type = "text";
      otherInput.className = "text-input";
      otherInput.id = `${question.id}__other-text`;
      otherInput.placeholder = "Please specify...";
      otherInput.style.display = "none";
      otherInput.setAttribute("aria-label", "Please specify your answer");
      
      if (typeof savedAnswer === "object" && savedAnswer?.otherText) {
        otherInput.value = savedAnswer.otherText;
        otherInput.style.display = "block";
      }
      
      wrapper.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener("change", () => {
          otherInput.style.display = radio.value === "other" ? "block" : "none";
        });
      });
      
      wrapper.appendChild(otherInput);
    }
    return wrapper;
  },

  renderOpenEnded(question, savedAnswer) {
    const wrapper = document.createElement("div");
    wrapper.className = "open-ended";
    
    const textarea = document.createElement("textarea");
    textarea.id = question.id;
    textarea.className = "text-input text-input--multiline";
    textarea.rows = 4;
    textarea.placeholder = question.placeholder || "";
    textarea.value = savedAnswer || "";
    textarea.setAttribute("aria-label", question.text);
    
    wrapper.appendChild(textarea);
    return wrapper;
  },

  renderRanking(question, savedAnswer) {
    const wrapper = document.createElement("div");
    wrapper.className = "ranking-list";
    const slotValues = savedAnswer ? [...savedAnswer] : new Array(question.options.length).fill(null);
    
    function getAvailableOptions() {
      return question.options.filter((option) => !slotValues.includes(option.value));
    }
    
    function refreshSlot(slotIndex, slotRow) {
      const select = slotRow.querySelector("select");
      const currentValue = slotValues[slotIndex];
      select.innerHTML = "";
      
      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = "Select option";
      select.appendChild(placeholderOption);
      
      const optionsToShow = currentValue 
        ? [question.options.find((o) => o.value === currentValue), ...getAvailableOptions()] 
        : getAvailableOptions();
        
      optionsToShow.forEach((option) => {
        const optionEl = document.createElement("option");
        optionEl.value = option.value;
        optionEl.textContent = option.label;
        select.appendChild(optionEl);
      });
      select.value = currentValue || "";
    }

    question.options.forEach((_, slotIndex) => {
      const slotRow = document.createElement("div");
      slotRow.className = "ranking-slot";
      
      const rankLabel = document.createElement("span");
      rankLabel.className = "ranking-slot__number";
      rankLabel.textContent = `${slotIndex + 1} \u2014`;
      
      const select = document.createElement("select");
      select.className = "ranking-slot__select";
      select.setAttribute("aria-label", `Rank ${slotIndex + 1} of ${question.options.length}`);
      select.addEventListener("change", (event) => {
        slotValues[slotIndex] = event.target.value || null;
        wrapper.querySelectorAll(".ranking-slot").forEach((row, i) => refreshSlot(i, row));
      });
      
      slotRow.append(rankLabel, select);
      wrapper.appendChild(slotRow);
      refreshSlot(slotIndex, slotRow);
    });
    
    wrapper._slotValues = slotValues;
    return wrapper;
  },

  renderInfo(question) {
    const wrapper = document.createElement("div");
    wrapper.className = "info-card";
    
    if (question.points && question.points.length > 0) {
      const list = document.createElement("ul");
      list.className = "info-card__list";
      
      question.points.forEach((point) => {
        const item = document.createElement("li");
        item.className = "info-card__item";
        item.textContent = point;
        list.appendChild(item);
      });
      wrapper.appendChild(list);
    }
    return wrapper;
  },

  renderQuestionBody(question, savedAnswer) {
    switch (question.type) {
      case "single-choice":
        return this.renderSingleChoice(question, savedAnswer);
      case "open-ended":
        return this.renderOpenEnded(question, savedAnswer);
      case "ranking":
        return this.renderRanking(question, savedAnswer);
      case "info":
        return this.renderInfo(question);
      default:
        throw new Error(`Unknown question type: "${question.type}"`);
    }
  },

  collectAnswerFromDOM(question, bodyElement) {
    switch (question.type) {
      case "single-choice": {
        const checkedInput = bodyElement.querySelector('input[type="radio"]:checked');
        if (!checkedInput) return null;
        if (question.allowOther && checkedInput.value === "other") {
          const otherInput = bodyElement.querySelector(`#${question.id}__other-text`);
          return { value: "other", otherText: otherInput ? otherInput.value.trim() : "" };
        }
        return checkedInput.value;
      }
      case "info":
        return null;
      case "open-ended": {
        const textarea = bodyElement.querySelector("textarea");
        const value = textarea.value.trim();
        return value === "" ? null : value;
      }
      case "ranking": {
        const values = bodyElement._slotValues;
        return values.includes(null) ? null : values;
      }
      default:
        throw new Error(`Unknown question type: "${question.type}"`);
    }
  },

  renderCurrentQuestion(container) {
    const question = window.SmartMatatu.getQuestionById(this.surveyState.currentQuestionId);
    if (!question) {
      console.error(`Could not find question with id "${this.surveyState.currentQuestionId}"`);
      return;
    }
    const questionText = this.surveyState.isPastTensePath && question.textPastTense 
      ? question.textPastTense 
      : question.text;

    container.innerHTML = "";
    
    const sectionLabel = document.createElement("p");
    sectionLabel.className = "question-section-label";
    sectionLabel.textContent = question.section;
    
    const questionHeading = document.createElement("h2");
    questionHeading.className = "question-text";
    questionHeading.textContent = questionText;
    
    const savedAnswer = window.SmartMatatu.Storage.getAllAnswers()[question.id];
    const body = this.renderQuestionBody(question, savedAnswer);
    body.dataset.questionId = question.id;
    
    const validationMessage = document.createElement("p");
    validationMessage.className = "validation-message";
    validationMessage.id = "validation-message";
    validationMessage.setAttribute("role", "alert");
    validationMessage.hidden = true;
    
    container.append(sectionLabel, questionHeading, body, validationMessage);
    this.updateProgressBar();
    this.updatePreviousButtonVisibility();
  },

  goToNextQuestion(container) {
    const question = window.SmartMatatu.getQuestionById(this.surveyState.currentQuestionId);
    const bodyElement = container.querySelector(`[data-question-id="${question.id}"]`);
    const answer = this.collectAnswerFromDOM(question, bodyElement);
    const validation = window.SmartMatatu.Validation.isAnswerValid(question, answer);
    const validationMessage = container.querySelector("#validation-message");
    
    if (!validation.valid) {
      validationMessage.textContent = validation.message;
      validationMessage.hidden = false;
      return;
    }
    
    validationMessage.hidden = true;
    window.SmartMatatu.Storage.saveResponse(question.id, answer);
    
    if (question.id === "ever-used-matatu" && answer === "yes") {
      this.surveyState.isPastTensePath = true;
    }
    
    const nextId = window.SmartMatatu.getNextQuestionId(question.id, window.SmartMatatu.Storage.getAllAnswers());
    if (nextId === null) {
      this.finishSurvey();
      return;
    }
    
    this.surveyState.history.push(this.surveyState.currentQuestionId);
    this.surveyState.currentQuestionId = nextId;
    this.renderCurrentQuestion(container);
  },

  goToPreviousQuestion(container) {
    if (this.surveyState.history.length === 0) return;
    this.surveyState.currentQuestionId = this.surveyState.history.pop();
    this.renderCurrentQuestion(container);
  },

  finishSurvey() {
    window.SmartMatatu.Storage.submitCompletedSurvey();
    window.location.href = "thank-you.html";
  },

  /* ==========================================================================
     DYNAMIC PATH PROGRESS CALCULATION
     Avoids hardcoded totals. Simulates the path to find the exact question 
     count and filters out static info slides.
     ========================================================================== */
  updateProgressBar() {
    const progressFill = document.getElementById("progress-fill");
    const progressLabel = document.getElementById("progress-label");
    if (!progressFill || !progressLabel) return;

    const answers = window.SmartMatatu.Storage.getAllAnswers();
    const activeId = this.surveyState.currentQuestionId;
    const activeQuestion = window.SmartMatatu.getQuestionById(activeId);

    // Simulate the entire path based on current answers and projections
    const simulatedPath = [];
    let currentId = "age";
    const maxIterations = 40; // Guard against infinite loops

    while (currentId !== null && simulatedPath.length < maxIterations) {
      simulatedPath.push(currentId);

      let projectedAnswer = answers[currentId];
      if (projectedAnswer === undefined) {
        // Fallbacks to simulate branching correctly for unreached nodes
        if (currentId === "currently-uses-matatu") {
          projectedAnswer = "yes";
        } else if (currentId === "ever-used-matatu") {
          projectedAnswer = "yes";
        } else if (currentId === "would-use-smartmatatu") {
          projectedAnswer = "yes";
        }
      }

      const simulatedAnswers = { ...answers, [currentId]: projectedAnswer };
      currentId = window.SmartMatatu.getNextQuestionId(currentId, simulatedAnswers);
    }

    // Filter out info screens from the active question count
    const countedPath = simulatedPath.filter((id) => {
      const q = window.SmartMatatu.getQuestionById(id);
      return q && q.type !== "info";
    });

    const activeIndexInCounted = countedPath.indexOf(activeId);
    const totalQuestions = countedPath.length;

    // Display appropriate progress text
    if (activeQuestion && activeQuestion.type === "info") {
      progressLabel.textContent = "Information";
    } else {
      const currentNumber = activeIndexInCounted + 1;
      progressLabel.textContent = `Question ${currentNumber} of ${totalQuestions}`;
    }

    // Progress bar fill percentage based on simulated path index
    const overallIndex = simulatedPath.indexOf(activeId);
    const denominator = simulatedPath.length > 1 ? simulatedPath.length - 1 : 1;
    const percentage = Math.min(Math.max((overallIndex / denominator) * 100, 0), 100);

    progressFill.style.width = `${percentage}%`;
  },

  updatePreviousButtonVisibility() {
    const previousButton = document.getElementById("previous-btn");
    if (!previousButton) return;
    previousButton.style.visibility = this.surveyState.history.length === 0 ? "hidden" : "visible";
  },

  startSurvey(container) {
    this.surveyState.currentQuestionId = "age";
    this.surveyState.history = [];
    this.surveyState.isPastTensePath = false;
    this.renderCurrentQuestion(container);
    
    document.getElementById("next-btn").addEventListener("click", () => this.goToNextQuestion(container));
    document.getElementById("previous-btn").addEventListener("click", () => this.goToPreviousQuestion(container));
  }
};