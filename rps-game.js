// Rock Paper Scissors Game

document.addEventListener("DOMContentLoaded", () => {
  const choices = ["rock", "paper", "scissors"];
  const buttons = document.querySelectorAll("#rps-game button");
  const playerChoiceSpan = document.getElementById("rps-player-choice");
  const computerChoiceSpan = document.getElementById("rps-computer-choice");
  const resultHeading = document.getElementById("rps-result");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const playerChoice = button.getAttribute("data-choice");
      const computerChoice = choices[Math.floor(Math.random() * 3)];

      playerChoiceSpan.textContent = playerChoice;
      computerChoiceSpan.textContent = computerChoice;

      const result = getResult(playerChoice, computerChoice);
      resultHeading.textContent = result;
    });
  });

  function getResult(player, computer) {
    if (player === computer) return "It's a Draw!";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      return "You Win! 🎉";
    } else {
      return "You Lose! 😢";
    }
  }
});
