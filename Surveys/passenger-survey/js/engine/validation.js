window.SmartMatatu = window.SmartMatatu || {};

window.SmartMatatu.Validation = {
  isAnswerValid(question, answer) {
    if (!question.required) {
      return { valid: true, message: "" };
    }
    if (answer === null || answer === void 0) {
      return {
        valid: false,
        message: "This question is required. Please provide an answer before continuing."
      };
    }
    switch (question.type) {
      case "info":
        return { valid: true, message: "" };

      case "single-choice": {
        if (typeof answer === "object" && answer.value === "other") {
          if (!answer.otherText || answer.otherText.trim() === "") {
            return {
              valid: false,
              message: "Please specify your answer in the text field provided."
            };
          }
        }
        return { valid: true, message: "" };
      }

      case "open-ended": {
        if (typeof answer === "string" && answer.trim() === "") {
          return {
            valid: false,
            message: "This question is required. Please share a short response before continuing."
          };
        }
        return { valid: true, message: "" };
      }

      case "ranking": {
        const expectedSlotCount = question.options.length;
        if (!Array.isArray(answer) || answer.length !== expectedSlotCount || answer.includes(null)) {
          return {
            valid: false,
            message: `Please rank all ${expectedSlotCount} options before continuing.`
          };
        }
        return { valid: true, message: "" };
      }

      default:
        console.error(`validation.js: unknown question type "${question.type}"`);
        return { valid: false, message: "Something went wrong. Please refresh and try again." };
    }
  }
};