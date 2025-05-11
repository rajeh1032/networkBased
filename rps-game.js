// Rock Paper Scissors Game

document.addEventListener("DOMContentLoaded", () => {
  const choices = ["rock", "paper", "scissors"];
  const buttons = document.querySelectorAll("#rps-game button");
  const playerChoiceSpan = document.getElementById("rps-player-choice");
  const computerChoiceSpan = document.getElementById("rps-computer-choice");
  const resultHeading = document.getElementById("rps-result");

  // Add score tracking
  let scores = {
    wins: 0,
    losses: 0,
    draws: 0,
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const playerChoice = button.getAttribute("data-choice");
      const computerChoice = choices[Math.floor(Math.random() * 3)];

      const result = getResult(playerChoice, computerChoice);
      resultHeading.textContent = result;
      updateScoreDisplay();
    });
  });

  function getResult(player, computer) {
    const arabicChoices = {
      rock: "حجر",
      paper: "ورق",
      scissors: "مقص",
    };

    playerChoiceSpan.textContent = arabicChoices[player];
    computerChoiceSpan.textContent = arabicChoices[computer];

    if (player === computer) {
      scores.draws++;
      return "تعادل! 🤝";
    }
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      scores.wins++;
      return "أنت الفائز! 🎉";
    } else {
      scores.losses++;
      return "خسرت! 😢";
    }
  }

  function updateScoreDisplay() {
    document.getElementById("wins-count").textContent = scores.wins;
    document.getElementById("losses-count").textContent = scores.losses;
    document.getElementById("draws-count").textContent = scores.draws;
  }
});
