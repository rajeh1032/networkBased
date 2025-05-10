// Quiz Game Implementation

// Game variables
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Function to initialize the quiz game
function initializeQuizGame() {
  // Reset game state
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz-score").textContent = score;

  // Define quiz questions
  questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Hyper Transfer Markup Language",
        "High Text Markup Language",
        "Home Tool Markup Language",
      ],
      answer: 0,
    },
    {
      question: "Which property is used to change the background color in CSS?",
      options: ["color", "bgcolor", "background-color", "background"],
      answer: 2,
    },
    {
      question: "Which of the following is not a JavaScript data type?",
      options: ["Boolean", "String", "Integer", "Object"],
      answer: 2,
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style System",
        "Cascading Style Sheet",
        "Computer Style Sheet",
        "Creative Style System",
      ],
      answer: 1,
    },
    {
      question:
        "Which method is used to add an element at the end of an array in JavaScript?",
      options: ["push()", "append()", "addToEnd()", "add()"],
      answer: 0,
    },
  ];

  // Set up event listener for the next button
  document
    .getElementById("next-question")
    .addEventListener("click", nextQuestion);

  // Display the first question
  displayQuestion();
}

// Function to display a question
function displayQuestion() {
  // Get containers
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");

  // Clear previous question
  questionContainer.innerHTML = "";
  optionsContainer.innerHTML = "";

  // Get current question
  const question = questions[currentQuestionIndex];

  // Display question
  questionContainer.textContent = question.question;

  // Display options
  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option;
    optionElement.dataset.index = index;

    optionElement.addEventListener("click", selectOption);

    optionsContainer.appendChild(optionElement);
  });

  // Hide next button initially
  document.getElementById("next-question").style.display = "none";
}

// Function to handle option selection
function selectOption(e) {
  // Get selected option index
  const selectedIndex = parseInt(e.target.dataset.index);

  // Get correct answer index
  const correctIndex = questions[currentQuestionIndex].answer;

  // Get all options
  const options = document.querySelectorAll(".option");

  // Disable all options
  options.forEach((option) => {
    option.removeEventListener("click", selectOption);
    option.style.cursor = "default";
  });

  // Mark selected option as correct or wrong
  if (selectedIndex === correctIndex) {
    e.target.classList.add("correct");
    score++;
    document.getElementById("quiz-score").textContent = score;
  } else {
    e.target.classList.add("wrong");
    options[correctIndex].classList.add("correct");
  }

  // Show next button
  document.getElementById("next-question").style.display = "block";
}

// Function to move to the next question
function nextQuestion() {
  currentQuestionIndex++;

  // Check if quiz is complete
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  // Display next question
  displayQuestion();
}

// Function to end the quiz
function endQuiz() {
  // Get containers
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");

  // Clear previous question
  questionContainer.innerHTML = "";
  optionsContainer.innerHTML = "";

  // Display final score
  questionContainer.innerHTML = `
        <h3>Quiz Complete!</h3>
        <p>Your final score: ${score} out of ${questions.length}</p>
    `;

  // Change button text
  const nextButton = document.getElementById("next-question");
  nextButton.textContent = "Restart Quiz";
  nextButton.style.display = "block";

  // Change button functionality
  nextButton.removeEventListener("click", nextQuestion);
  nextButton.addEventListener("click", () => {
    nextButton.textContent = "Next Question";
    nextButton.removeEventListener("click", arguments.callee);
    nextButton.addEventListener("click", nextQuestion);
    initializeQuizGame();
  });
}
