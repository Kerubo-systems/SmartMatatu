window.SmartMatatu = window.SmartMatatu || {};

window.SmartMatatu.QUESTIONS = [
  {
    id: "age",
    section: "About you",
    text: "What is your age?",
    type: "single-choice",
    required: true,
    options: [
      { value: "under-18", label: "Under 18" },
      { value: "18-24", label: "18 - 24" },
      { value: "25-34", label: "25 - 34" },
      { value: "35-44", label: "35 - 44" },
      { value: "45-plus", label: "45+" }
    ]
  },
  {
    id: "currently-uses-matatu",
    section: "About you",
    text: "Do you currently use a matatu?",
    type: "single-choice",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "ever-used-matatu",
    section: "About you",
    text: "Have you ever used a matatu?",
    type: "single-choice",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "never-used-reason",
    section: "About you",
    text: "Is there a particular reason why you've never used a matatu?",
    type: "open-ended",
    required: true,
    placeholder: "Tell us a little about why..."
  },
  {
    id: "frequency",
    section: "Travel habits",
    text: "How often do you use a matatu?",
    textPastTense: "Thinking back, how often did you use a matatu?",
    type: "single-choice",
    required: true,
    options: [
      { value: "almost-daily", label: "Almost daily" },
      { value: "weekly", label: "Once or twice a week" },
      { value: "monthly", label: "A few times a month" },
      { value: "rarely", label: "Not so often" }
    ]
  },
  {
    id: "most-valued",
    section: "Travel habits",
    text: "What do you value most when travelling in a matatu?",
    textPastTense: "What did you value most when travelling in a matatu?",
    type: "open-ended",
    required: true,
    placeholder: "E.g. punctuality, friendly drivers, low fares..."
  },
  {
    id: "annoyances",
    section: "Travel habits",
    text: "What things annoy you about matatu transport?",
    textPastTense: "What things used to annoy you about matatu transport?",
    type: "open-ended",
    required: true,
    placeholder: "E.g. loud music, overcrowding, reckless driving..."
  },
  {
    id: "safety",
    section: "Safety and comfort",
    text: "How safe do you usually feel when travelling by matatu?",
    textPastTense: "How safe did you usually feel when travelling by matatu?",
    type: "single-choice",
    required: true,
    options: [
      { value: "very-safe", label: "Very safe" },
      { value: "safe", label: "Safe" },
      { value: "not-too-safe", label: "Not too safe" },
      { value: "never-safe", label: "Never safe" },
      { value: "not-sure", label: "Not sure" }
    ]
  },
  {
    id: "comfort",
    section: "Safety and comfort",
    text: "How comfortable do you normally feel in a matatu?",
    textPastTense: "How comfortable did you normally feel in a matatu?",
    type: "single-choice",
    required: true,
    options: [
      { value: "very-comfortable", label: "Very comfortable" },
      { value: "somewhat-comfortable", label: "Somewhat comfortable" },
      { value: "very-little-comfort", label: "Very little comfort" },
      { value: "never-comfortable", label: "Never comfortable" },
      { value: "not-sure", label: "Not sure" }
    ]
  },
  {
    id: "fare-fairness",
    section: "Pricing",
    text: "How fair do you think matatu fares usually are?",
    textPastTense: "How fair did you think matatu fares usually were?",
    type: "single-choice",
    required: true,
    options: [
      { value: "very-fair", label: "Very fair" },
      { value: "sometimes-fair", label: "Sometimes fair" },
      { value: "averagely-fair", label: "Averagely fair" },
      { value: "rarely-fair", label: "Rarely fair" },
      { value: "never-fair", label: "Never fair" }
    ]
  },
  {
    id: "overcharged",
    section: "Pricing",
    text: "Have you ever been overcharged?",
    textPastTense: "Were you ever overcharged?",
    type: "single-choice",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "frustration-ranking",
    section: "Frustrations",
    text: "Rank these from MOST frustrating (1) to LEAST frustrating (7).",
    textPastTense: "Looking back, rank these from MOST frustrating (1) to LEAST frustrating (7).",
    type: "ranking",
    required: true,
    options: [
      { value: "overloading", label: "Overloading" },
      { value: "heat", label: "Heat" },
      { value: "loud-music", label: "Loud music" },
      { value: "reckless-driving", label: "Reckless driving" },
      { value: "poor-service", label: "Poor customer service" },
      { value: "dirty-vehicle", label: "Dirty vehicle" },
      { value: "long-wait", label: "Long waiting time" }
    ]
  },
  {
    id: "one-improvement",
    section: "Looking ahead",
    text: "If you could improve ONE thing about matatus tomorrow, what would it be?",
    textPastTense: "If you could have improved ONE thing about matatus back then, what would it have been?",
    type: "open-ended",
    required: true,
    placeholder: "Describe the one change you'd make..."
  },
  {
    id: "would-use-smartmatatu",
    section: "Looking ahead",
    text: "If we built SmartMatatu with the features described, would you use it?",
    type: "single-choice",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "would-not-use-reason",
    section: "Looking ahead",
    text: "Why not?",
    type: "open-ended",
    required: true,
    placeholder: "Tell us what would need to change..."
  },
  {
    id: "feature-intro",
    section: "Looking ahead",
    text: "Imagine SmartMatatu existed. Here are the features it could offer:",
    type: "info",
    required: false,
    points: [
      "\u{1F6E1}\uFE0F  Automatic collision prevention \u2014 technology that detects danger and brakes automatically",
      "\u{1F465}  No overloading \u2014 sensors that prevent vehicles from exceeding safe passenger capacity",
      "\u{1F4B3}  Transparent digital fares \u2014 clear, fixed pricing displayed before you board",
      "\u{1F4CA}  Driver behaviour monitoring \u2014 real-time tracking of speed, braking, and route compliance",
      "\u26A1  Cleaner electric transport \u2014 emission-free electric matatus for a healthier city"
    ]
  },
  {
    id: "priority-feature",
    section: "Looking ahead",
    text: "Imagine SmartMatatu existed. Which feature would matter most to you?",
    type: "single-choice",
    required: true,
    allowOther: true,
    options: [
      { value: "collision-prevention", label: "Automatic collision prevention" },
      { value: "no-overloading", label: "No overloading" },
      { value: "transparent-fares", label: "Transparent digital fares" },
      { value: "driver-monitoring", label: "Driver behaviour monitoring" },
      { value: "electric-transport", label: "Cleaner electric transport" },
      { value: "other", label: "Other" }
    ]
  },
  {
    id: "future-participation",
    section: "Closing",
    text: "Thank you for your responses. Would you be willing to participate in future SmartMatatu surveys?",
    type: "single-choice",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "feedback",
    section: "Closing",
    text: "Any feedback?",
    type: "open-ended",
    required: false,
    placeholder: "Anything else you'd like to share (optional)..."
  }
];

window.SmartMatatu.getQuestionById = function(questionId) {
  return window.SmartMatatu.QUESTIONS.find(q => q.id === questionId);
};

/* ==========================================================================
   ROUTING ENGINE (getNextQuestionId)
   Includes corrected Path B2 logic (features are introduced BEFORE asking)
   ========================================================================== */
window.SmartMatatu.getNextQuestionId = function(currentQuestionId, answers) {
  switch (currentQuestionId) {
    case "age":
      return "currently-uses-matatu";

    case "currently-uses-matatu":
      return answers["currently-uses-matatu"] === "yes" ? "frequency" : "ever-used-matatu";

    case "ever-used-matatu":
      return answers["ever-used-matatu"] === "yes" ? "frequency" : "never-used-reason";

    case "never-used-reason":
      // PATH B2 CORRECTION: Present features first before asking if they would use it
      return "feature-intro";

    case "frequency":
      return "most-valued";

    case "most-valued":
      return "annoyances";

    case "annoyances":
      return "safety";

    case "safety":
      return "comfort";

    case "comfort":
      return "fare-fairness";

    case "fare-fairness":
      return "overcharged";

    case "overcharged":
      return "frustration-ranking";

    case "frustration-ranking":
      return "one-improvement";

    case "one-improvement":
      return "feature-intro";

    case "feature-intro":
      // If user has never used a matatu, Route to the usage validation questions next
      if (answers["ever-used-matatu"] === "no") {
        return "would-use-smartmatatu";
      }
      return "priority-feature";

    case "would-use-smartmatatu":
      return answers["would-use-smartmatatu"] === "no" ? "would-not-use-reason" : "priority-feature";

    case "would-not-use-reason":
      return "priority-feature";

    case "priority-feature":
      return "future-participation";

    case "future-participation":
      return "feedback";

    case "feedback":
      return null;

    default:
      console.warn(`No branching rule defined for question: "${currentQuestionId}". Ending survey.`);
      return null;
  }
};