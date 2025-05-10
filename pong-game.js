// Pong Game
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pong-canvas");
  const ctx = canvas.getContext("2d");

  let playerY = canvas.height / 2 - 40;
  let computerY = canvas.height / 2 - 40;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ballSpeedX = 4;
  let ballSpeedY = 4;
  const paddleHeight = 80;
  const paddleWidth = 10;
  const ballSize = 10;

  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player paddle
    ctx.fillStyle = "#3498db";
    ctx.fillRect(10, playerY, paddleWidth, paddleHeight);

    // Computer paddle
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(canvas.width - 20, computerY, paddleWidth, paddleHeight);

    // Ball
    ctx.fillStyle = "#2ecc71";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
  }

  function move() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce off top and bottom
    if (ballY < ballSize || ballY > canvas.height - ballSize) {
      ballSpeedY = -ballSpeedY;
    }

    // Bounce off player paddle
    if (
      ballX - ballSize < 20 &&
      ballY > playerY &&
      ballY < playerY + paddleHeight
    ) {
      ballSpeedX = -ballSpeedX;
    }

    // Bounce off computer paddle
    if (
      ballX + ballSize > canvas.width - 20 &&
      ballY > computerY &&
      ballY < computerY + paddleHeight
    ) {
      ballSpeedX = -ballSpeedX;
    }

    // Reset ball if out of bounds
    if (ballX < 0 || ballX > canvas.width) {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = -ballSpeedX;
    }

    // Move computer paddle
    const computerCenter = computerY + paddleHeight / 2;
    if (computerCenter < ballY - 10) {
      computerY += 4;
    } else if (computerCenter > ballY + 10) {
      computerY -= 4;
    }
  }

  function gameLoop() {
    move();
    draw();
    requestAnimationFrame(gameLoop);
  }

  // Control player paddle
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && playerY > 0) {
      playerY -= 20;
    } else if (
      e.key === "ArrowDown" &&
      playerY < canvas.height - paddleHeight
    ) {
      playerY += 20;
    }
  });

  // Start game when pong page is shown
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (link.getAttribute("data-game") === "pong") {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        playerY = canvas.height / 2 - 40;
        computerY = canvas.height / 2 - 40;
      }
    });
  });

  gameLoop();
});
