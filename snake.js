//snake.js

//canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//canvas style
const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake =[ // can be done dynamically?
    {x:200, y:200}, {x:190, y:200}, {x:180, y:200},{x:170, y:200},
    {x:160, y:200}
];

//movement velocity
let dx = 10;
let dy = 10;

const drawCanvas = (width, height) =>{
    ctx.fillStyle = board_background;
    ctx.strokestyle = board_border;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeRect(0, 0, width, height);
}

const DrawSnakeParts = (snakeCanvas) =>{
    ctx.fillStyle = 'lightblue';
    ctx.strokestyle = 'darkblue';
    ctx.fillRect(snakeCanvas.x, snakeCanvas.y, 10,10);
    ctx.strokeRect (snakeCanvas.x, snakeCanvas.y, 10, 10);   
};

const drawSnake = () =>{
    snake.forEach(DrawSnakeParts);
}

const moveSnake = () =>{
    const head = {x: snake[0].x + dx, y:snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}

function main(){

    setTimeout(function onTick(){
        drawCanvas(canvas.width, canvas.height);
        moveSnake();
        drawSnake();
        main();
    }, 100);
}

main();
