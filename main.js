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

const foodDiv = document.getElementById("food");
const snakeHeadDiv = document.getElementById("snake-head");
const snakeJointDivs = document.getElementsByClassName("snake-joint");



////
//// LOGIC
////

const placeFood = () => {
    x = Math.floor(Math.random()*boardWidth);
    y = Math.floor(Math.random()*boardHeight);

    food.x = x;
    food.y = y;

    console.log("x = "+x)
    console.log("y = "+y)

    foodDiv.style.left = (x * cellSize)+"px";
    foodDiv.style.top = (y * cellSize)+"px";
}


////
//// GAME START
////

placeFood();