const quiz = document.getElementById("quiz");
const questions = document.querySelectorAll(".question-container");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const restartButton = document.getElementById("restart");
const userInfo = document.getElementById("user-info");
const startQuizButton = document.getElementById("start-quiz");
const userNameInput = document.getElementById("user-name");
const progressBar = document.getElementById("progress-bar");

let currentQuestion = 0;
let score = 0;

// Start Quiz2
startQuizButton.addEventListener("click", () => {
  const userName = userNameInput.value.trim();
  if (!userName) {
    alert("Please enter your name!");
    return;
  }
  // Save user data to localStorage
  localStorage.setItem("userName", userName);

  // Transition to the quiz
  userInfo.classList.add("fade-out");
  setTimeout(() => {
    userInfo.classList.add("hidden");
    quiz.classList.remove("hidden");
    quiz.classList.add("fade-in");
    updateProgressBar(); // Initialize progress bar
  }, 500);
});

// Handle answer button clicks
quiz.addEventListener("click", (e) => {
  if (e.target.classList.contains("answer")) {
    const selectedScore = parseInt(e.target.getAttribute("data-score"));
    score += selectedScore;

    // Animate current question out
    questions[currentQuestion].classList.add("fade-out");

    setTimeout(() => {
      questions[currentQuestion].classList.add("hidden");
      currentQuestion++;

      if (currentQuestion < questions.length) {
        // Update progress bar
        updateProgressBar();

        // Show next question with animation
        questions[currentQuestion].classList.remove("hidden");
        questions[currentQuestion].classList.add("fade-in");
      } else {
        // Show result
        showResult();
      }
    }, 500);
  }
});

// Update progress bar
function updateProgressBar() {
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Display the result
function showResult() {
  resultContainer.classList.remove("hidden");
  resultContainer.classList.add("fade-in");

  // Save the final score
  localStorage.setItem("score", score);

  const userName = localStorage.getItem("userName");
  if (score <= 4) {
    resultText.textContent = `${userName}, you love timeless styles. Check out our classic collection!`;
  } else if (score <= 8) {
    resultText.textContent = `${userName}, you’re into modern designs! Our contemporary pieces are perfect for you.`;
  } else {
    resultText.textContent = `${userName}, you love bold and unique pieces. Explore our statement collection!`;
  }
}

// Restart the quiz
restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;

  resultContainer.classList.add("fade-out");

  setTimeout(() => {
    resultContainer.classList.add("hidden");
    questions[0].classList.remove("hidden");
    questions[0].classList.add("fade-in");

    // Reset progress bar
    progressBar.style.width = "0%";
  }, 500);
});