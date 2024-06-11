const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameContainer = document.querySelector(".game-container");
let playerPosition = gameContainer.clientWidth / 2 - player.clientWidth / 2;
let obstaclePosition =
  Math.random() * (gameContainer.clientWidth - obstacle.clientWidth);
let obstacleSpeed = 5;
let score = 0;
let touchStartX = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    movePlayer(-10);
  } else if (event.key === "ArrowRight") {
    movePlayer(10);
  }
});

document.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});

document.addEventListener("touchmove", (event) => {
  const touchCurrentX = event.touches[0].clientX;
  const movementX = touchCurrentX - touchStartX;
  movePlayer(movementX);
  touchStartX = touchCurrentX;
});

function movePlayer(offset) {
  playerPosition += offset;
  if (playerPosition < 0) playerPosition = 0;
  if (playerPosition > gameContainer.clientWidth - player.clientWidth) {
    playerPosition = gameContainer.clientWidth - player.clientWidth;
  }
  player.style.left = `${playerPosition}px`;
}

function moveObstacle() {
  obstacle.style.top = `${parseInt(obstacle.style.top) + obstacleSpeed}px`;

  if (parseInt(obstacle.style.top) > gameContainer.clientHeight) {
    obstacle.style.top = "-30px";
    obstaclePosition =
      Math.random() * (gameContainer.clientWidth - obstacle.clientWidth);
    obstacle.style.left = `${obstaclePosition}px`;
    score++;
    console.log(`Score: ${score}`);
  }

  if (checkCollision(player, obstacle)) {
    alert(`Game Over! Your Score: ${score}`);
    resetGame();
  }

  requestAnimationFrame(moveObstacle);
}

function checkCollision(player, obstacle) {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  return !(
    playerRect.top > obstacleRect.bottom ||
    playerRect.bottom < obstacleRect.top ||
    playerRect.right < obstacleRect.left ||
    playerRect.left > obstacleRect.right
  );
}

function resetGame() {
  obstacle.style.top = "-30px";
  obstaclePosition =
    Math.random() * (gameContainer.clientWidth - obstacle.clientWidth);
  obstacle.style.left = `${obstaclePosition}px`;
  score = 0;
}

obstacle.style.top = "-30px";
obstacle.style.left = `${obstaclePosition}px`;
moveObstacle();
