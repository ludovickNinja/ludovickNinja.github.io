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

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");
const quiz = document.getElementById("quiz");
const scoreboard = document.getElementById("scoreboard");
const scoreText = document.getElementById("score-text");
const nameInput = document.getElementById("name-input");
const submitScore = document.getElementById("submit-score");

function loadQuestion() {
  const currentData = quizData[currentQuestion];
  questionEl.textContent = currentData.question;
  choicesEl.innerHTML = "";
  currentData.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => selectAnswer(choice));
    choicesEl.appendChild(li);
  });
  nextButton.disabled = true; // Disable Next button until feedback is shown
  console.log("Loading question:", currentQuestion, quizData[currentQuestion]); // Debug
}

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

function showFeedback(result, explanation) {
  const feedback = document.createElement("div");
  feedback.innerHTML = `
    <p><strong>${result}</strong></p>
    <p>${explanation}</p>
  `;
  choicesEl.innerHTML = "";
  choicesEl.appendChild(feedback);

  nextButton.disabled = false; // Enable the Next button after feedback
}

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

function updateProgressBar() {
  const progress = ((currentQuestion / quizData.length) * 100).toFixed(2);
  progressBar.style.width = `${progress}%`;
}

function endQuiz() {
  quiz.classList.add("hidden");
  scoreboard.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${quizData.length}!`;
}

function saveToGoogleSheets() {
  const playerName = nameInput.value.trim();
  if (!playerName) return alert("Please enter your name!");

  const data = {
    name: playerName,
    score: score,
    answers: answers,
  };

  const scriptURL = "https://script.google.com/macros/s/AKfycbynKXhASUjQRHkkM1FIH0sy3lYFYhfT001xdSS6xwmhM8-fpzHw7iOEBqgWy9bxkQHmKA/exec"; // Replace with your Apps Script URL

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
        alert("Failed to save score. Please try again.");
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Event Listeners
nextButton.addEventListener("click", nextQuestion);
submitScore.addEventListener("click", saveToGoogleSheets);

// Initialize Quiz
loadQuestion();
updateProgressBar();
