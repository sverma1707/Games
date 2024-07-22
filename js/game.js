const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bird, pipes, isGameOver;

function initializeGame() {
    bird = new Bird(canvas);
    pipes = new Pipes(canvas);
    isGameOver = false;
    startButton.style.display = 'none'; // Hide the start button
    canvas.addEventListener('click', () => {
        if (!isGameOver) bird.jump();
    });
    gameLoop();
}

function endGame() {
    isGameOver = true;
    canvas.removeEventListener('click', () => {
        if (!isGameOver) bird.jump();
    });
    startButton.innerText = 'Start Again';
    startButton.style.display = 'block'; // Show the start button
}

function gameLoop() {
    if (isGameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.update();
    bird.draw(ctx);
    pipes.update();
    pipes.draw(ctx);
    if (pipes.detectCollision(bird)) {
        endGame();
        return;
    }
    requestAnimationFrame(gameLoop);
}

startButton.addEventListener('click', initializeGame);
startButton.style.display = 'block'; // Initially show the start button
