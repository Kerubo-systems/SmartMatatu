window.SmartMatatu = window.SmartMatatu || {};

window.SmartMatatu.Storage = {
  STORAGE_KEY_RESPONSE_ID: "smartmatatu_response_id",
  STORAGE_KEY_ANSWERS: "smartmatatu_answers",
  STORAGE_KEY_SUBMITTED: "smartmatatu_submitted",

  generateResponseId() {
    const year = new Date().getFullYear();
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPart += characters[randomIndex];
    }
    return `SM-${year}-${randomPart}`;
  },

  getResponseId() {
    let responseId = localStorage.getItem(this.STORAGE_KEY_RESPONSE_ID);
    if (!responseId) {
      responseId = this.generateResponseId();
      localStorage.setItem(this.STORAGE_KEY_RESPONSE_ID, responseId);
    }
    return responseId;
  },

  getAllAnswers() {
    const rawJson = localStorage.getItem(this.STORAGE_KEY_ANSWERS);
    if (!rawJson) return {};
    try {
      return JSON.parse(rawJson);
    } catch (error) {
      console.error("storage.js: failed to parse saved answers, resetting.", error);
      return {};
    }
  },

  saveResponse(questionId, answer) {
    this.getResponseId();
    const allAnswers = this.getAllAnswers();
    allAnswers[questionId] = answer;
    localStorage.setItem(this.STORAGE_KEY_ANSWERS, JSON.stringify(allAnswers));
  },

  submitCompletedSurvey() {
    const submissionRecord = {
      responseId: this.getResponseId(),
      answers: this.getAllAnswers(),
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem(this.STORAGE_KEY_SUBMITTED, "true");
    console.log("Survey submitted (stored locally):", submissionRecord);
    return submissionRecord;
  },

  clearResponse() {
    localStorage.removeItem(this.STORAGE_KEY_RESPONSE_ID);
    localStorage.removeItem(this.STORAGE_KEY_ANSWERS);
    localStorage.removeItem(this.STORAGE_KEY_SUBMITTED);
  },

  hasSubmittedResponse() {
    return localStorage.getItem(this.STORAGE_KEY_SUBMITTED) === "true";
  }
};