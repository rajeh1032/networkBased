// Memory Game Implementation

// Game variables
let memoryCards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
let totalPairs = 8;

// Card symbols (using emojis for simplicity)
const cardSymbols = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

// Function to initialize the memory game
function initializeMemoryGame() {
  const memoryBoard = document.getElementById("memory-board");
  memoryBoard.innerHTML = "";

  // Create an array with pairs of symbols
  const cardPairs = [...cardSymbols, ...cardSymbols];

  // Shuffle the array
  shuffleArray(cardPairs);

  // Create cards and add them to the board
  cardPairs.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.symbol = symbol;

    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = "?";

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = symbol;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", flipCard);

    memoryBoard.appendChild(card);
  });

  // Reset game state
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  matchedPairs = 0;

  // Store all cards in the memoryCards array
  memoryCards = document.querySelectorAll(".memory-card");
}

// Function to flip a card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second click
  secondCard = this;

  checkForMatch();
}

// Function to check if cards match
function checkForMatch() {
  let isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    disableCards();
    matchedPairs++;

    // Check if the game is won
    if (matchedPairs === totalPairs) {
      setTimeout(() => {
        alert("Congratulations! You won the memory game!");
        resetGame();
      }, 1000);
    }
  } else {
    unflipCards();
  }
}

// Function to disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

// Function to unflip non-matching cards
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetBoard();
  }, 1000);
}

// Function to reset the board after each turn
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Function to reset the game
function resetGame() {
  lockBoard = true;

  setTimeout(() => {
    memoryCards.forEach((card) => {
      card.classList.remove("flipped");
    });

    initializeMemoryGame();
  }, 1000);
}

// Utility function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
