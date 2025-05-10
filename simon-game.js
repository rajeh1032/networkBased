// Simon Says Game
document.addEventListener("DOMContentLoaded", () => {
  const colors = ["green", "red", "yellow", "blue"];
  let sequence = [];
  let playerSequence = [];
  let gameStarted = false;

  const statusText = document.getElementById("simon-status");
  const buttons = document.querySelectorAll(".simon-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!gameStarted) {
        startGame();
        return;
      }
      const color = button.getAttribute("data-color");
      playerSequence.push(color);
      flashButton(color);
      checkPlayerMove();
    });
  });

  function startGame() {
    sequence = [];
    playerSequence = [];
    gameStarted = true;
    statusText.textContent = "Watch the sequence!";
    nextStep();
  }

  function nextStep() {
    playerSequence = [];
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    showSequence();
  }

  function showSequence() {
    let delay = 0;
    sequence.forEach((color, index) => {
      setTimeout(() => {
        flashButton(color);
        if (index === sequence.length - 1) {
          setTimeout(() => {
            statusText.textContent = "Your turn!";
          }, 400);
        }
      }, delay);
      delay += 600;
    });
  }

  function flashButton(color) {
    const button = document.querySelector(
      `.simon-button[data-color="${color}"]`
    );
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 300);
  }

  function checkPlayerMove() {
    const currentIndex = playerSequence.length - 1;
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
      statusText.textContent = "Wrong! You lose!";
      gameStarted = false;
      return;
    }

    if (playerSequence.length === sequence.length) {
      statusText.textContent = "Good! Next round...";
      setTimeout(nextStep, 1000);
    }
  }
});
