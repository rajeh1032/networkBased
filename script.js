document.addEventListener("DOMContentLoaded", () => {
  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  // Get all game screens
  const gameScreens = document.querySelectorAll(".game-screen");

  // Get welcome screen
  const welcomeScreen = document.getElementById("welcome-screen");

  // Add click event listener to each navigation link
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Get the game to show
      const gameToShow = link.getAttribute("data-game");

      // Hide all screens
      welcomeScreen.classList.remove("active-screen");
      gameScreens.forEach((screen) => {
        screen.classList.remove("active-screen");
      });

      // Show the selected game screen
      document
        .getElementById(`${gameToShow}-game`)
        .classList.add("active-screen");

      // Initialize the game if needed
      switch (gameToShow) {
        case "memory":
          if (!memoryGameInitialized) {
            initializeMemoryGame();
            memoryGameInitialized = true;
          }
          break;
        case "snake":
          // Snake game is initialized when start button is clicked
          break;
        case "quiz":
          if (!quizGameInitialized) {
            initializeQuizGame();
            quizGameInitialized = true;
          }
          break;
        case "tictactoe":
          if (!tictactoeGameInitialized) {
            initializeTicTacToe();
            tictactoeGameInitialized = true;
          }
          break;
      }
    });
  });

  // Set up global game state variables
  let memoryGameInitialized = false;
  let quizGameInitialized = false;
  let tictactoeGameInitialized = false;
});
