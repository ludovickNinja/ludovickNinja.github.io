const quizData = [
  {
    question: "Which gemstone is known as the 'king of gems'?",
    choices: ["Diamond", "Ruby", "Emerald", "Sapphire"],
    answer: "Ruby",
    explanation: "Rubies are known as the 'king of gems' and symbolize passion and power.",
    wikiLink: "https://en.wikipedia.org/wiki/Ruby",
  },
  {
    question: "What is the primary mineral component of pearls?",
    choices: ["Calcium Carbonate", "Quartz", "Silica", "Corundum"],
    answer: "Calcium Carbonate",
    explanation: "Pearls are made primarily of calcium carbonate, secreted by mollusks.",
    wikiLink: "https://en.wikipedia.org/wiki/Pearl",
  },
  {
    question: "What gemstone is often referred to as 'fool’s gold'?",
    choices: ["Pyrite", "Citrine", "Topaz", "Quartz"],
    answer: "Pyrite",
    explanation: "Pyrite is known as 'fool’s gold' because of its metallic luster and yellowish hue.",
    wikiLink: "https://en.wikipedia.org/wiki/Pyrite",
  },
  {
    question: "Which metal is hypoallergenic and commonly used for medical implants and jewelry?",
    choices: ["Platinum", "Titanium", "Silver", "Gold"],
    answer: "Titanium",
    explanation: "Titanium is hypoallergenic, lightweight, and widely used for medical implants and jewelry.",
    wikiLink: "https://en.wikipedia.org/wiki/Titanium",
  },
  {
    question: "What is the rarest birthstone?",
    choices: ["Alexandrite", "Opal", "Diamond", "Ruby"],
    answer: "Alexandrite",
    explanation: "Alexandrite is the rarest birthstone due to its unique color-changing properties.",
    wikiLink: "https://en.wikipedia.org/wiki/Alexandrite",
  },
  {
    question: "Which gemstone is known for displaying a play-of-color?",
    choices: ["Opal", "Moonstone", "Topaz", "Tourmaline"],
    answer: "Opal",
    explanation: "Opals are famous for their play-of-color, a unique optical effect caused by diffraction of light.",
    wikiLink: "https://en.wikipedia.org/wiki/Opal",
  },
  {
    question: "Which metal is most commonly alloyed with gold to create rose gold?",
    choices: ["Copper", "Silver", "Platinum", "Nickel"],
    answer: "Copper",
    explanation: "Copper is mixed with gold to create rose gold, giving it its pinkish hue.",
    wikiLink: "https://en.wikipedia.org/wiki/Rose_gold",
  },
  {
    question: "What is the name of the largest diamond ever discovered?",
    choices: ["Cullinan Diamond", "Hope Diamond", "Koh-i-Noor", "Centenary Diamond"],
    answer: "Cullinan Diamond",
    explanation: "The Cullinan Diamond, weighing over 3,000 carats, is the largest diamond ever discovered.",
    wikiLink: "https://en.wikipedia.org/wiki/Cullinan_Diamond",
  },
  {
    question: "What gemstone is often associated with good luck and fortune in ancient cultures?",
    choices: ["Jade", "Onyx", "Aquamarine", "Garnet"],
    answer: "Jade",
    explanation: "Jade is believed to bring good luck and fortune, especially in Chinese culture.",
    wikiLink: "https://en.wikipedia.org/wiki/Jade",
  },
  {
    question: "Which gemstone is known for its distinctive star-shaped pattern under light?",
    choices: ["Star Sapphire", "Emerald", "Ruby", "Spinel"],
    answer: "Star Sapphire",
    explanation: "Star Sapphires display a star-like optical phenomenon called asterism.",
    wikiLink: "https://en.wikipedia.org/wiki/Star_sapphire",
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
