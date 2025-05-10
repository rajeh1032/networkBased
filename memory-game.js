// memory-game.js

let firstCard,
  secondCard,
  lockBoard = false,
  matchedPairs = 0;
const symbols = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

function initializeMemoryGame() {
  const board = document.getElementById("memory-board");
  board.innerHTML = "";
  matchedPairs = 0;

  // مضاعفة الرموز وخلطهم
  const cards = shuffle([...symbols, ...symbols]);

  // إنشاء الكروت
  cards.forEach((symbol) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.symbol = symbol;
    card.innerHTML = `
      <div class="front">?</div>
      <div class="back">${symbol}</div>
    `;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains("flipped"))
    return;

  this.classList.add("flipped");
  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
  if (isMatch) {
    disableCards();
    if (++matchedPairs === symbols.length) {
      setTimeout(() => {
        alert("مبروك! لقد ربحت اللعبة 🎉");
        initializeMemoryGame();
      }, 800);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetTurn();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetTurn();
  }, 800);
}

function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
