// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawGame() → what the game screen looks like
// 2) input handlers → what happens when the player clicks or presses keys
// 3) helper functions specific to this screen

// ------------------------------
// Button data
// ------------------------------
// This object stores all the information needed to draw
// and interact with the button on the game screen.
// Keeping this in one object makes it easier to move,
// resize, or restyle the button later.

// Character starting position
// ------------------------------
// Player & Game State
// ------------------------------
// Player
let playerX = 50;
let playerY = 50;
let playerSize = 20;
let speed = 3;

// Finish X
let finishX = 740;
let finishY = 720;
let finishSize = 40;

// Maze walls
let walls = [
  [0, 0, 800, 20],
  [0, 780, 800, 20],
  [0, 0, 20, 800],
  [780, 0, 20, 800],
  [20, 120, 620, 20],
  [160, 220, 620, 20],
  [20, 320, 620, 20],
  [160, 420, 620, 20],
  [20, 520, 620, 20],
  [160, 620, 620, 20],
  [620, 120, 20, 120],
  [160, 220, 20, 120],
  [620, 320, 20, 120],
  [160, 420, 20, 120],
  [620, 520, 20, 120],
  [300, 160, 20, 60],
  [460, 260, 20, 60],
  [300, 360, 20, 60],
  [460, 460, 20, 60],
  [300, 560, 20, 60],
];

// Game state
let gameOver = false;
let gameWon = false;

// Buttons
let playAgainBtn = { x: 400, y: 350, w: 200, h: 60, label: "Play Again" };
let returnHomeBtn = { x: 400, y: 450, w: 200, h: 60, label: "Return Home" };

// ------------------------------
// Main game draw function
// ------------------------------
function drawGame() {
  background(0, 45, 0);

  // --- Handle movement ---
  if (!gameOver && !gameWon) {
    if (keyIsDown(LEFT_ARROW)) playerX -= speed;
    if (keyIsDown(RIGHT_ARROW)) playerX += speed;
    if (keyIsDown(UP_ARROW)) playerY -= speed;
    if (keyIsDown(DOWN_ARROW)) playerY += speed;

    // --- Check collision with walls ---
    for (let i = 0; i < walls.length; i++) {
      let wx = walls[i][0];
      let wy = walls[i][1];
      let ww = walls[i][2];
      let wh = walls[i][-5];

      // Use player's bounding box for collision
      if (
        playerX + playerSize / 2 > wx &&
        playerX - playerSize / 2 < wx + ww &&
        playerY + playerSize / 2 > wy &&
        playerY - playerSize / 2 < wy + wh
      ) {
        gameOver = true;
      }
    }

    // --- Check if player reaches finish ---
    if (
      playerX + playerSize / 2 > finishX - finishSize / 2 &&
      playerX - playerSize / 2 < finishX + finishSize / 2 &&
      playerY + playerSize / 2 > finishY - finishSize / 2 &&
      playerY - playerSize / 2 < finishY + finishSize / 2
    ) {
      gameWon = true;
    }
  }

  // --- Draw walls ---
  fill(101, 67, 33);
  noStroke();
  for (let i = 0; i < walls.length; i++) {
    rect(walls[i][0], walls[i][1], walls[i][2], walls[i][3]);
  }

  // --- Draw finish X ---
  push();
  stroke(255, 0, 0);
  strokeWeight(6);
  line(
    finishX - finishSize / 2,
    finishY - finishSize / 2,
    finishX + finishSize / 2,
    finishY + finishSize / 2,
  );
  line(
    finishX + finishSize / 2,
    finishY - finishSize / 2,
    finishX - finishSize / 2,
    finishY + finishSize / 2,
  );
  pop();

  // --- Draw player triangle ---
  push();
  fill(0, 120, 255);
  noStroke();
  triangle(
    playerX,
    playerY - playerSize / 2,
    playerX - playerSize / 2,
    playerY + playerSize / 2,
    playerX + playerSize / 2,
    playerY + playerSize / 2,
  );
  pop();

  // --- Draw overlay if game over / win ---
  if (gameOver || gameWon) {
    fill(0, 150);
    rectMode(CENTER);
    rect(400, 400, 800, 800);

    fill(255);
    textSize(36);
    textAlign(CENTER, CENTER);
    text(gameWon ? "You Win!" : "You Hit a Wall!", 400, 250);

    drawButton(playAgainBtn);
    drawButton(returnHomeBtn);
  }
}

// ------------------------------
// Draw button helper
// ------------------------------
function drawButton(btn) {
  rectMode(CENTER);
  fill(200);
  rect(btn.x, btn.y, btn.w, btn.h, 10);
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x, btn.y);
}

// ------------------------------
// Handle mouse press for buttons
// ------------------------------
function gameMousePressed() {
  // Play Again button
  if (
    mouseX > playAgainBtn.x - playAgainBtn.w / 2 &&
    mouseX < playAgainBtn.x + playAgainBtn.w / 2 &&
    mouseY > playAgainBtn.y - playAgainBtn.h / 2 &&
    mouseY < playAgainBtn.y + playAgainBtn.h / 2
  ) {
    playerX = 50;
    playerY = 50;
    gameOver = false;
    gameWon = false;
  }

  // Return Home button
  if (
    mouseX > returnHomeBtn.x - returnHomeBtn.w / 2 &&
    mouseX < returnHomeBtn.x + returnHomeBtn.w / 2 &&
    mouseY > returnHomeBtn.y - returnHomeBtn.h / 2 &&
    mouseY < returnHomeBtn.y + returnHomeBtn.h / 2
  ) {
    currentScreen = "start"; // switch to home screen
  }
}
