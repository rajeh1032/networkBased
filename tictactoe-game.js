

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
