// Snake Game Implementation

// Game variables
let canvas, ctx;
let snake = [];
let food = {};
let direction = "right";
let score = 0;
let gameInterval;
let gameSpeed = 100;
let gameRunning = false;

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById("snake-canvas");
  ctx = canvas.getContext("2d");

  // Set up event listener for the start button
  document.getElementById("snake-start").addEventListener("click", () => {
    if (!gameRunning) {
      startSnakeGame();
    } else {
      resetSnakeGame();
    }
  });

  // Set up keyboard controls
  document.addEventListener("keydown", changeDirection);
});

// Function to start the snake game
function startSnakeGame() {
  // Reset the game
  resetSnakeGame();

  // Initialize the snake (3 parts initially)
  snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
  ];

  // Create initial food
  createFood();

  // Reset score
  score = 0;
  document.getElementById("snake-score").textContent = score;

  // Set initial direction
  direction = "right";

  // Update button text
  document.getElementById("snake-start").textContent = "Restart Game";

  // Start the game loop
  gameRunning = true;
  gameInterval = setInterval(gameLoop, gameSpeed);
}

// Main game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the snake
  moveSnake();

  // Check for collisions
  if (checkCollision()) {
    endGame();
    return;
  }

  // Check if snake eats food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    // Increase score
    score++;
    document.getElementById("snake-score").textContent = score;

    // Don't remove the tail (the snake grows)
    createFood();
  } else {
    // Remove the tail
    snake.pop();
  }

  // Draw the snake and food
  drawSnake();
  drawFood();
}

// Function to move the snake
function moveSnake() {
  // Create the new head
  const head = { x: snake[0].x, y: snake[0].y };

  // Move the head based on current direction
  switch (direction) {
    case "up":
      head.y -= 10;
      break;
    case "down":
      head.y += 10;
      break;
    case "left":
      head.x -= 10;
      break;
    case "right":
      head.x += 10;
      break;
  }

  // Add the new head to the beginning of the snake
  snake.unshift(head);
}

// Function to draw the snake
function drawSnake() {
  snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? "#2ecc71" : "#27ae60";
    ctx.fillRect(part.x, part.y, 10, 10);
    ctx.strokeStyle = "#145a32";
    ctx.strokeRect(part.x, part.y, 10, 10);
  });
}

// Function to create food at a random position
function createFood() {
  // Generate random coordinates (multiple of 10)
  food = {
    x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
    y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
  };

  // Make sure food doesn't spawn on snake
  for (let part of snake) {
    if (part.x === food.x && part.y === food.y) {
      createFood();
      return;
    }
  }
}

// Function to draw the food
function drawFood() {
  ctx.fillStyle = "#e74c3c";
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.strokeStyle = "#c0392b";
  ctx.strokeRect(food.x, food.y, 10, 10);
}

// Function to check for collisions
function checkCollision() {
  const head = snake[0];

  // Check collision with walls
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    return true;
  }

  // Check collision with self (starting from second segment)
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Function to change the snake's direction
function changeDirection(event) {
  // Ignore if the game is not running
  if (!gameRunning) return;

  const key = event.keyCode;

  // Prevent reverse direction
  if (key === 37 && direction !== "right") {
    // Left arrow
    direction = "left";
  } else if (key === 38 && direction !== "down") {
    // Up arrow
    direction = "up";
  } else if (key === 39 && direction !== "left") {
    // Right arrow
    direction = "right";
  } else if (key === 40 && direction !== "up") {
    // Down arrow
    direction = "down";
  }
}

// Function to end the game
function endGame() {
  clearInterval(gameInterval);
  gameRunning = false;
  alert(`Game Over! Your score: ${score}`);
  document.getElementById("snake-start").textContent = "Start Game";
}

// Function to reset the game
function resetSnakeGame() {
  // Clear any existing interval
  if (gameInterval) {
    clearInterval(gameInterval);
  }

  // Reset game variables
  snake = [];
  food = {};
  direction = "right";
  score = 0;
  document.getElementById("snake-score").textContent = score;
  gameRunning = false;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reset button text
  document.getElementById("snake-start").textContent = "Start Game";
}
