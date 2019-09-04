console.log("JavaScript loaded!")



////
//// GLOBAL CONSTANTS
////

const cellSize = 20; // in pixels
const boardWidth = 17; // in cells
const boardHeight = 17; // in cells



////
//// GAMEPLAY VARIABLES
////

let food = {
    x: 5,
    y: 5
}

let snake = [
    {
        x: 2,
        y: 2
    },
    {
        x: 1,
        y: 2
    },
]

let direction = "right";



////
//// DOM ELEMENTS
////

const boardDiv = document.getElementById("board");
const foodDiv = document.getElementById("food");
const snakeHeadDiv = document.getElementById("snake-head");
const snakeJointDivs = document.getElementsByClassName("snake-joint");
const lengthP = document.getElementById("length-p");
const lengthSpan = document.getElementById("length-span");
const startButton = document.getElementById("start-button");



////
//// LOGIC
////

const placeFood = () => {
    // Randomize values of x and y.
    // But we can't have them colliding with the snake!
    let randomNeeded = true;
    while (randomNeeded) {
        x = Math.floor(Math.random()*boardWidth);
        y = Math.floor(Math.random()*boardHeight);
        randomNeeded = false;
        snake.map((joint)=>{
            if (joint.x==x && joint.y==y) {
                randomNeeded = true;
            }
        })
    }

    // Set food to the values.
    food.x = x;
    food.y = y;

    console.log("x = "+x)
    console.log("y = "+y)

    // Change CSS positioning.
    foodDiv.style.left = (x * cellSize)+"px";
    foodDiv.style.top = (y * cellSize)+"px";
}

const growSnake = (newX, newY) => {
    newJoint = {x: newX, y: newY};
    snake.push(newJoint);
    
    newJointDiv = document.createElement("div");
    newJointDiv.className = "snake-joint";
    boardDiv.appendChild(newJointDiv);

    lengthSpan.textContent = snake.length;
}

const eatFood = () => {
    console.log("Eating the food!")
    placeFood();
}

const placeSnake = () => {

    // If the snake reaches the food...
    if (snake[0].x==food.x && snake[0].y==food.y) {
        eatFood();

        // We will be adding a joint where the last joint was.
        // So we need to know that position.
        lastX = snake[snake.length-1].x;
        lastY = snake[snake.length-1].y;
        growSnake(lastX, lastY);
    }

    // Position each snake-joint.
    for (let i = 0; i < snakeJointDivs.length; i++) {
        snakeJointDivs[i].style.left = (snake[i].x * cellSize) + "px";
        snakeJointDivs[i].style.top = (snake[i].y * cellSize) + "px";
    }
}

const moveSnake = () => {
    for (let i = snake.length-1; i > 0; i--) {
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }
    switch (direction) {
        case "up":
            if (snake[0].y == 0) {
                snake[0].y = boardHeight-1;
            }
            else {
                snake[0].y--;
            }
            break;
        case "down":
            if (snake[0].y == boardHeight-1) {
                snake[0].y = 0;
            }
            else {
                snake[0].y++;
            }
            break;
        case "left":
            if (snake[0].x == 0) {
                snake[0].x = boardWidth-1;
            }
            else {
                snake[0].x--;
            }
            break;
        case "right":
            if (snake[0].x == boardWidth-1) {
                snake[0].x = 0;
            }
            else {
                snake[0].x++;
            }
    }
    placeSnake();
}


const changeDirection = (e) => {
    let oldDirection = direction;
    switch (e.key.toLowerCase()) {
        case "w": 
            if (direction != "down") direction = "up";
            break;
        case "a":
            if (direction != "right") direction = "left";
            break;
        case "s":
            if (direction != "up") direction = "down";
            break;
        case "d":
            if (direction != "left") direction = "right";
    }
    if (oldDirection != direction) {
        console.log(direction);
    }
}

const startGame = () => {
    document.addEventListener("keydown",changeDirection);
    startButton.remove();
    const interval = setInterval(moveSnake,1000);
    placeSnake();
    lengthP.style.display = "initial";
}

////
//// GAME START
////

placeFood();

startButton.addEventListener("click",startGame);