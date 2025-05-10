// Whack-a-Mole Game
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("whack-grid");
  const scoreDisplay = document.getElementById("whack-score");
  const startButton = document.getElementById("whack-start");

  let score = 0;
  let molePosition;
  let timerId;
  let gameInterval;
  const gridSize = 9;

  function createGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < gridSize; i++) {
      const square = document.createElement("div");
      square.classList.add("whack-square");
      square.setAttribute("data-id", i);
      square.addEventListener("click", hitMole);
      grid.appendChild(square);
    }
  }

  function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    clearInterval(gameInterval);
    gameInterval = setInterval(randomMole, 800);
  }

  function randomMole() {
    document.querySelectorAll(".whack-square").forEach((square) => {
      square.classList.remove("mole");
    });

    const squares = document.querySelectorAll(".whack-square");
    molePosition = Math.floor(Math.random() * gridSize);
    squares[molePosition].classList.add("mole");
  }

  function hitMole() {
    if (this.getAttribute("data-id") == molePosition) {
      score++;
      scoreDisplay.textContent = score;
      this.classList.remove("mole");
      molePosition = null;
    }
  }

  startButton.addEventListener("click", startGame);
  createGrid();
});
