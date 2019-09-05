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

let gameInPlay = false;



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
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");
const rubric = document.getElementById("rubric");
const moveButtonsUl = document.getElementById("move-buttons-ul");
const moveButtons = document.getElementsByClassName("move-button");
const startOrResume = document.getElementById("start-or-resume");



////
//// LOGIC
////

const toggleElementVisibility = (el) => {
    if (el.className == "hidden") {
        el.className = "not-hidden";
    }
    else {
        el.className = "hidden";
    }
}

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
    // We only move anything if the game is not paused/started.
    if (gameInPlay) {
        // Assign every joint to the position of the previous joint.
        for (let i = snake.length-1; i > 0; i--) {
            snake[i].x = snake[i-1].x;
            snake[i].y = snake[i-1].y;
        }
        // Assign the snake-head to its new position.
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
        // Update CSS positioning.
        placeSnake();
    }
}

const toggleMoveButtons = () => {
    // Enable all buttons.
    for (let i = 0; i < 4; i++) {
        moveButtons[i].disabled = false;
        moveButtons[i].className = "move-button";
    }

    // Disable the button opposite to the current direction
    switch (direction) {
        case "up":
            moveButtons[3].disabled = true;
            moveButtons[0].className = "move-button selected";
            break;
        case "left":
            moveButtons[2].disabled = true;
            moveButtons[1].className = "move-button selected";
            break;
        case "right":
            moveButtons[1].disabled = true;
            moveButtons[2].className = "move-button selected";
            break;
        case "down":
            moveButtons[0].disabled = true;
            moveButtons[3].className = "move-button selected";
    }
}


const changeDirectionFromKey = (e) => {
    if (gameInPlay) {
        let oldDirection = direction;

        // We disallow direction opposite to current direction.
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
            // Make the move-buttons selected/disabled/neither.
            toggleMoveButtons();
        }
    }
}

const changeDirectionFromButton = (i) => {
    let oldDirection = direction;

    // We disallow direction opposite to current direction.
    switch (i) {
        case 0: 
            if (direction != "down") {
                direction = "up";
            }
            break;
        case 1:
            if (direction != "right") {
                direction = "left";
            }
            break;
        case 3:
            if (direction != "up") {
                direction = "down";
            }
            break;
        case 2:
            if (direction != "left") {
                direction = "right";
            };
    }
    
    if (oldDirection != direction) {
        console.log(direction);
        // Make the move-buttons selected/disabled/neither
        toggleMoveButtons();
    }
}

const resumeGame = (interval) => {
    gameInPlay = true;

    // Hide and show elements.
    rubric.className = "hidden";
    moveButtonsUl.className = "not-hidden";

    resumeButton.className = "hidden";
    pauseButton.className = "not-hidden";
}

const pauseGame = (interval) => {
    gameInPlay = false;

    // Hide and show elements.
    rubric.className = "not-hidden";
    moveButtonsUl.className = "hidden";

    pauseButton.className = "hidden";
    resumeButton.className = "not-hidden";

    // Rubric needs to update to "Click Resume game and..."
    startOrResume.textContent = "Resume";
}

const startGame = () => {
    document.addEventListener("keydown",changeDirectionFromKey);
    startButton.remove();
    const interval = setInterval(moveSnake, 200);
    placeSnake();
    rubric.style.flex = 0;
    lengthP.style.display = "initial";
    toggleElementVisibility(rubric);
    toggleElementVisibility(moveButtonsUl);

    gameInPlay = true;

    pauseButton.className = "not-hidden";
    pauseButton.addEventListener("click", pauseGame)

    // resume-button is hidden, but let's add an event-listener for if it get displayed.
    resumeButton.addEventListener("click", resumeGame)
}

////
//// GAME START
////

placeFood();

startButton.addEventListener("click",startGame);

for (let i = 0; i < moveButtons.length; i++) {
    moveButtons[i].addEventListener("click",()=>{changeDirectionFromButton(i)});
}