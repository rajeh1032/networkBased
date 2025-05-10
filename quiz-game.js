// Quiz Game Implementation

// Game variables
let currentQuestionIndex = 0;
let quizScore = 0;
let quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Hemingway", "Twain"],
    answer: "Shakespeare",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
];

function initializeQuizGame() {
  currentQuestionIndex = 0;
  quizScore = 0;
  document.getElementById("quiz-score").textContent = quizScore;
  showQuestion();

  document
    .getElementById("next-question")
    .addEventListener("click", nextQuestion);
}

function showQuestion() {
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");

  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("quiz-option");
    button.addEventListener("click", () => selectAnswer(option));
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".quiz-option");

  optionButtons.forEach((btn) => (btn.disabled = true));

  if (selectedOption === currentQuestion.answer) {
    quizScore++;
    document.getElementById("quiz-score").textContent = quizScore;
  }

  // Highlight correct and wrong answers
  optionButtons.forEach((btn) => {
    if (btn.textContent === currentQuestion.answer) {
      btn.style.backgroundColor = "#2ecc71"; // correct
    } else if (btn.textContent === selectedOption) {
      btn.style.backgroundColor = "#e74c3c"; // wrong
    }
  });
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= quizQuestions.length) {
    alert(`Quiz finished! Your score: ${quizScore}/${quizQuestions.length}`);
    initializeQuizGame();
    return;
  }

  showQuestion();
}
