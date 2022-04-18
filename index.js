const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext('2d')
const scoreText = document.querySelector("#score")
const resetButton = document.querySelector("#reset")
const gameWidth = gameBoard.width;
const gameHeight = gameWidth.height;
const boardBackGround = "black"
const snakeColor = 'lightgreen'
const snakeBorder = 'black'
const foodColor = 'red'
const unitSize = 25;
//
let running = false
let xVelocity = unitSize
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
]
//
window.addEventListener('keydown', changeDirection);
resetButton.addEventListener('click', resetGame);
gameStart();

function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick()
};

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver()
            nextTick()
        }, 105)

    } else {
        displayGameOver()
    }
};

function clearBoard() {
    ctx.fillStyle = boardBackGround;
    ctx.fillRect(0, 0, gameWidth, gameWidth)
};

function createFood() {
    function randomFood(min, max) {
        let randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum
    }

    foodX = randomFood(0, gameWidth - unitSize);
    console.log(foodX)
    foodY = randomFood(0, gameWidth - unitSize);
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
};

function moveSnake() {
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity}
    snake.unshift(head)
    snake.forEach( (snakepart,index) => {
        if (snakepart.x < 0){
            snakepart.x = (gameWidth - unitSize) + unitSize * index
        }
        if (snakepart.x > gameWidth){
            snakepart.x = 0 - unitSize * index
        }
        if (snakepart.y < 0){
            snakepart.y = (gameWidth - unitSize) + unitSize * index
        }
        if (snakepart.y > gameWidth){
            snakepart.y = 0 - unitSize * index
        }
    } )
    if ( snake[0].x === foodX && snake[0].y === foodY){
        score++
        scoreText.textContent = score
        createFood();
    }else{
        snake.pop()

    }

};

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize))
    snake.forEach(snakePart => ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize))


};

function changeDirection(e) {
    const keyPressed = e.keyCode;
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;
//    check the direction
    const goingUp = (yVelocity == -unitSize)
    const goingDown = (yVelocity == unitSize)
    const goingLeft = (xVelocity == -unitSize)
    const goingRight = (xVelocity == unitSize)
//    switch the direction

    switch (true){
        case (keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize
            yVelocity = 0;
            break;
        case (keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize
            yVelocity = 0;
            break;
        case (keyPressed == UP && !goingDown):
            yVelocity = -unitSize;
            xVelocity = 0;
            break;
        case (keyPressed == DOWN && !goingUp):
            yVelocity = unitSize;
            xVelocity = 0
            break;
    }
};

function checkGameOver() {
    for( let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            running = false
        }
    }
};

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!",gameWidth / 2, gameWidth / 2)
};

function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ]
    gameStart()
};