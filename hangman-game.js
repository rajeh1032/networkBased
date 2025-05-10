// Hangman Game
document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "apple",
    "banana",
    "orange",
    "grape",
    "mango",
    "cherry",
    "peach",
  ];
  let selectedWord = "";
  let guessedLetters = [];
  let wrongGuesses = 0;
  const maxWrong = 6;

  const wordDisplay = document.getElementById("hangman-word");
  const wrongDisplay = document.getElementById("hangman-wrong");
  const lettersContainer = document.getElementById("hangman-letters");
  const resultDisplay = document.getElementById("hangman-result");
  const resetButton = document.getElementById("hangman-reset");

  function initializeHangman() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    wrongDisplay.textContent = wrongGuesses;
    resultDisplay.textContent = "";
    displayWord();
    createLetterButtons();
  }

  function displayWord() {
    const display = selectedWord
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
    wordDisplay.textContent = display;

    if (!display.includes("_")) {
      resultDisplay.textContent = "You Win! 🎉";
      disableLetters();
    }
  }

  function createLetterButtons() {
    lettersContainer.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i).toLowerCase();
      const button = document.createElement("button");
      button.textContent = letter;
      button.addEventListener("click", () => guessLetter(letter, button));
      lettersContainer.appendChild(button);
    }
  }

  function guessLetter(letter, button) {
    button.disabled = true;
    if (selectedWord.includes(letter)) {
      guessedLetters.push(letter);
      displayWord();
    } else {
      wrongGuesses++;
      wrongDisplay.textContent = wrongGuesses;
      if (wrongGuesses >= maxWrong) {
        resultDisplay.textContent = `You Lose! The word was: ${selectedWord}`;
        disableLetters();
      }
    }
  }

  function disableLetters() {
    const buttons = lettersContainer.querySelectorAll("button");
    buttons.forEach((btn) => (btn.disabled = true));
  }

  resetButton.addEventListener("click", initializeHangman);
});
