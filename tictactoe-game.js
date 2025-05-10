// // Tic Tac Toe Game Implementation

// // Game variables
// let board = ["", "", "", "", "", "", "", "", ""];
// let currentPlayer = "X";
// let gameActive = true;

// // Winning combinations
// const winningCombinations = [
//   [0, 1, 2], // Top row
//   [3, 4, 5], // Middle row
//   [6, 7, 8], // Bottom row
//   [0, 3, 6], // Left column
//   [1, 4, 7], // Middle column
//   [2, 5, 8], // Right column
//   [0, 4, 8], // Diagonal top-left to bottom-right
//   [2, 4, 6], // Diagonal top-right to bottom-left
// ];

// // Function to initialize the tic tac toe game
// function initializeTicTacToe() {
//   // Get the board container
//   const tictactoeBoard = document.getElementById("tictactoe-board");
//   tictactoeBoard.innerHTML = "";

//   // Create cells for the board
//   for (let i = 0; i < 9; i++) {
//     const cell = document.createElement("div");
//     cell.classList.add("tictactoe-cell");
//     cell.dataset.index = i;
//     cell.addEventListener("click", handleCellClick);
//     tictactoeBoard.appendChild(cell);
//   }

//   // Reset game state
//   resetTicTacToe();

//   // Add event listener to reset button
//   document
//     .getElementById("tictactoe-reset")
//     .addEventListener("click", resetTicTacToe);

//   // Update status message
//   updateStatus();
// }

// // Function to handle cell click
// function handleCellClick(e) {
//   // Get the clicked cell index
//   const index = parseInt(e.target.dataset.index);

//   // Ignore click if cell is filled or game is not active
//   if (board[index] !== "" || !gameActive) {
//     return;
//   }

//   // Update the board
//   board[index] = currentPlayer;
//   e.target.textContent = currentPlayer;

//   // Check for win or draw
//   if (checkWin()) {
//     gameActive = false;
//     highlightWinningCombination();
//     updateStatus(`Player ${currentPlayer} wins!`);
//     return;
//   }

//   if (checkDraw()) {
//     gameActive = false;
//     updateStatus("Game ended in a draw!");
//     return;
//   }

//   // Switch player
//   currentPlayer = currentPlayer === "X" ? "O" : "X";
//   updateStatus();
// }

// // Function to check for a win
// function checkWin() {
//   for (let combination of winningCombinations) {
//     const [a, b, c] = combination;
//     if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
//       return true;
//     }
//   }
//   return false;
// }

// // Function to highlight the winning combination
// function highlightWinningCombination() {
//   for (let combination of winningCombinations) {
//     const [a, b, c] = combination;
//     if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
//       // Get all cells
//       const cells = document.querySelectorAll(".tictactoe-cell");

//       // Highlight winning cells
//       cells[a].style.backgroundColor = "#2ecc71";
//       cells[b].style.backgroundColor = "#2ecc71";
//       cells[c].style.backgroundColor = "#2ecc71";

//       return;
//     }
//   }
// }

// // Function to check for a draw
// function checkDraw() {
//   return !board.includes("");
// }

// // Function to update status message
// function updateStatus(message) {
//   const statusElement = document.getElementById("tictactoe-status");

//   if (message) {
//     statusElement.textContent = message;
//   } else {
//     statusElement.textContent = `Player ${currentPlayer}'s turn`;
//   }
// }

// // Function to reset the game
// function resetTicTacToe() {
//   // Reset board array
//   board = ["", "", "", "", "", "", "", "", ""];

//   // Reset cells
//   const cells = document.querySelectorAll(".tictactoe-cell");
//   cells.forEach((cell) => {
//     cell.textContent = "";
//     cell.style.backgroundColor = "#f0f0f0";
//   });

//   // Reset game state
//   currentPlayer = "X";
//   gameActive = true;

//   // Update status
//   updateStatus();
// }

// tictactoe-game.js

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initializeTicTacToe() {
  const boardEl = document.getElementById("tictactoe-board");
  boardEl.innerHTML = "";
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  updateStatus();

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "tictactoe-cell";
    cell.dataset.index = i;
    cell.onclick = handleClick;
    boardEl.appendChild(cell);
  }

  document.getElementById("tictactoe-reset").onclick = initializeTicTacToe;
}

function handleClick() {
  const i = this.dataset.index;
  if (!gameActive || board[i]) return;

  board[i] = currentPlayer;
  this.textContent = currentPlayer;

  if (checkWin()) {
    gameActive = false;
    highlightWin();
    updateStatus(`اللاعب ${currentPlayer} فاز!`);
  } else if (!board.includes("")) {
    gameActive = false;
    updateStatus("تعادل!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
}

function checkWin() {
  return winCombos.some(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]
  );
}

function highlightWin() {
  winCombos.forEach(([a, b, c]) => {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.querySelectorAll(".tictactoe-cell").forEach((cell, i) => {
        if (i == a || i == b || i == c) cell.style.backgroundColor = "#2ecc71";
      });
    }
  });
}

function updateStatus(msg) {
  document.getElementById("tictactoe-status").textContent =
    msg || `دور اللاعب ${currentPlayer}`;
}
