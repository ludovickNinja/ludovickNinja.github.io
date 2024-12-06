const quizData = [
  {
    question: "What is the birthstone for January?",
    choices: ["Garnet", "Emerald", "Amethyst", "Ruby"],
    answer: "Garnet",
    explanation: "Garnet is known as the birthstone for January, symbolizing protection and trust.",
  },
  {
    question: "Which gemstone is actually a type of fossilized tree resin?",
    choices: ["Amber", "Topaz", "Turquoise", "Garnet"],
    answer: "Amber",
    explanation: "Amber is fossilized tree resin, often containing ancient inclusions like insects or plant material, making it unique and valuable in jewelry.",
  },
  {
    question: "What is the Mohs scale used to measure?",
    choices: ["Weight", "Hardness", "Color", "Value"],
    answer: "Hardness",
    explanation: "The Mohs scale ranks minerals by their ability to scratch softer materials.",
  },
  {
    question: "Which gemstone is known as the 'stone of love'?",
    choices: ["Rose Quartz", "Sapphire", "Emerald", "Topaz"],
    answer: "Rose Quartz",
    explanation: "Rose Quartz is associated with love, compassion, and emotional healing.",
  },
  {
    question: "What is the rarest gemstone in the world?",
    choices: ["Alexandrite", "Tanzanite", "Painite", "Opal"],
    answer: "Painite",
    explanation: "Painite was once considered the rarest gemstone, with only a handful of specimens known.",
  },
];

let currentQuestion = 0;
let score = 0;
const answers = [];
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
const submitScore = document.getElementById("submit-score");

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
      `The correct answer is "${correctAnswer}". ${currentData.explanation}`
    );
  }

  answers.push({
    question: currentData.question,
    selected: choice,
    correct: choice === correctAnswer,
    explanation: currentData.explanation,
  });
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

  nextButton.disabled = false; // Enable the "Next" button
}

// Load the next question
function nextQuestion() {
  currentQuestion++;
  nextButton.disabled = true;

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

// Submit the score to Google Sheets
function saveToGoogleSheets() {
  if (!userName) {
    alert("User name is missing. Please enter your name before starting the quiz.");
    return;
  }

  const data = {
    name: userName,
    score: score,
    answers: answers,
  };

  const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_URL_HERE/exec"; // Replace with your actual Apps Script URL

  fetch(scriptURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.status === "success") {
        alert("Score successfully saved to Google Sheets!");
      } else {
        alert("Failed to save score. Please check your Google Apps Script.");
      }
    })
    .catch((error) => {
      console.error("Error saving score:", error);
      alert("An error occurred while saving your score. Please try again.");
    });
}

// Event Listeners
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
submitScore.addEventListener("click", saveToGoogleSheets);
