const quizData = [
  {
    question: "What is the birthstone for January?",
    choices: ["Garnet", "Emerald", "Amethyst", "Ruby"],
    answer: "Garnet",
    explanation: "Garnet is known as the birthstone for January, symbolizing protection and trust.",
    wikiLink: "https://en.wikipedia.org/wiki/Garnet",
  },
  {
    question: "Which gemstone is actually a type of fossilized tree resin?",
    choices: ["Amber", "Topaz", "Turquoise", "Garnet"],
    answer: "Amber",
    explanation: "Amber is fossilized tree resin, often containing ancient inclusions like insects or plant material.",
    wikiLink: "https://en.wikipedia.org/wiki/Amber",
  },
  {
    question: "What is the Mohs scale used to measure?",
    choices: ["Weight", "Hardness", "Color", "Value"],
    answer: "Hardness",
    explanation: "The Mohs scale ranks minerals by their ability to scratch softer materials.",
    wikiLink: "https://en.wikipedia.org/wiki/Mohs_scale_of_mineral_hardness",
  },
  {
    question: "Which gemstone is known as the 'stone of love'?",
    choices: ["Rose Quartz", "Sapphire", "Emerald", "Topaz"],
    answer: "Rose Quartz",
    explanation: "Rose Quartz is associated with love, compassion, and emotional healing.",
    wikiLink: "https://en.wikipedia.org/wiki/Rose_quartz",
  },
  {
    question: "What is the rarest gemstone in the world?",
    choices: ["Alexandrite", "Tanzanite", "Painite", "Opal"],
    answer: "Painite",
    explanation: "Painite was once considered the rarest gemstone, with only a handful of specimens known.",
    wikiLink: "https://en.wikipedia.org/wiki/Painite",
  },
  {
    question: "Which gemstone is often associated with royalty?",
    choices: ["Ruby", "Amethyst", "Emerald", "Sapphire"],
    answer: "Sapphire",
    explanation: "Sapphire has been associated with royalty and wisdom for centuries.",
    wikiLink: "https://en.wikipedia.org/wiki/Sapphire",
  },
  {
    question: "Which gemstone is traditionally given on the 60th wedding anniversary?",
    choices: ["Ruby", "Diamond", "Emerald", "Amethyst"],
    answer: "Diamond",
    explanation: "Diamonds are traditionally given on the 60th wedding anniversary to symbolize enduring love.",
    wikiLink: "https://en.wikipedia.org/wiki/Diamond",
  },
  {
    question: "What color is natural turquoise?",
    choices: ["Blue-green", "Red", "Yellow", "Pink"],
    answer: "Blue-green",
    explanation: "Turquoise is naturally blue-green due to its copper content.",
    wikiLink: "https://en.wikipedia.org/wiki/Turquoise",
  },
  {
    question: "Which gem is known as the 'evening emerald' due to its green glow in low light?",
    choices: ["Alexandrite", "Peridot", "Emerald", "Tourmaline"],
    answer: "Peridot",
    explanation: "Peridot glows green under low light, earning it the nickname 'evening emerald.'",
    wikiLink: "https://en.wikipedia.org/wiki/Peridot",
  },
  {
    question: "Which gemstone changes color under different lighting?",
    choices: ["Alexandrite", "Topaz", "Spinel", "Zircon"],
    answer: "Alexandrite",
    explanation: "Alexandrite is famous for its color change, appearing green in daylight and red in incandescent light.",
    wikiLink: "https://en.wikipedia.org/wiki/Alexandrite",
  },
];

let currentQuestion = 0;
let score = 0;
let userName = "";

// DOM Elements
const startScreen = document.getElementById("start-screen");
const quiz = document.getElementById("quiz");
const scoreboard = document.getElementById("scoreboard");
const nameInputField = document.getElementById("name-input-field");
const startButton = document.getElementById("start-button");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");
const scoreText = document.getElementById("score-text");

// Start the quiz
function startQuiz() {
  userName = nameInputField.value.trim();
  if (!userName) {
    alert("Please enter your name to start the quiz.");
    return;
  }

  // Hide the start screen and show the quiz
  startScreen.classList.add("hidden");
  quiz.classList.remove("hidden");

  // Load the first question
  loadQuestion();
  updateProgressBar();
}

// Load a question
function loadQuestion() {
  const currentData = quizData[currentQuestion];
  questionEl.textContent = currentData.question;
  choicesEl.innerHTML = "";
  currentData.choices.forEach((choice) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => selectAnswer(choice));
    choicesEl.appendChild(li);
  });
  nextButton.disabled = true; // Disable the "Next" button until feedback is shown
}

// Select an answer
function selectAnswer(choice) {
  const currentData = quizData[currentQuestion];
  const correctAnswer = currentData.answer;

  if (choice === correctAnswer) {
    score++;
    showFeedback("Correct!", "");
  } else {
    showFeedback(
      "Incorrect!",
      `The correct answer is "${correctAnswer}". ${currentData.explanation} <a href="${currentData.wikiLink}" target="_blank">Learn more</a>.`
    );
  }

  nextButton.disabled = false; // Enable the "Next" button
}

// Show feedback
function showFeedback(result, explanation) {
  const feedback = document.createElement("div");
  feedback.innerHTML = `
    <p><strong>${result}</strong></p>
    <p>${explanation}</p>
  `;
  choicesEl.innerHTML = "";
  choicesEl.appendChild(feedback);
}

// Load the next question
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    updateProgressBar();
    loadQuestion();
  } else {
    endQuiz();
  }
}

// Update the progress bar
function updateProgressBar() {
  const progress = ((currentQuestion / quizData.length) * 100).toFixed(2);
  progressBar.style.width = `${progress}%`;
}

// End the quiz
function endQuiz() {
  quiz.classList.add("hidden");
  scoreboard.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${quizData.length}, ${userName}!`;
}

// Event Listeners
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
