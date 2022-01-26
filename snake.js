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
    {x:300, y:300}, 
    {x:310, y:300}, 
    {x:320, y:300},
    {x:330, y:300},
    {x:340, y:300}
];

//movement velocity
let dx = 10;
let dy = 0;

//food 
let food_x;
let food_y;

let score = 0;

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
    const has_eaten = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten){
        make_food(); 
        score += 10;
        document.getElementById('score').innerHTML = score;

    }else{
        snake.pop();
    }
}

const changeDirection = () =>{
    const A_LEFT_KEY = 65;
    const D_RIGHT_KEY = 68;
    const W_UP_KEY = 87;
    const S_DOWN_KEY = 83;

    const keyPressed = event.keyCode;
    const up = dy === -10;
    const down = dy === 10;
    const right = dx === 10;
    const left = dx === -10;

    if (changing_direction) return;
    changing_direction = true;

    if (keyPressed == A_LEFT_KEY && !right){
        dx = -10;
        dy = 0;
    };

    if (keyPressed == W_UP_KEY && !down){
        dx = 0;
        dy = -10;
    };

    if(keyPressed == D_RIGHT_KEY && !left){
        dx = 10;
        dy = 0;
    };

    if(keyPressed == S_DOWN_KEY && !up){
        dx = 0;
        dy = 10;
    }
};

const food = (min, max) =>{
    return Math.round((Math.random() * (max - min) + min)/ 10) * 10;
}

const make_food = () =>{
    food_x = food(0, canvas.width - 10);
    food_y = food(0, canvas.height -10);

    snake.forEach( (part) => {
        const has_eaten = part.x = food_x && part.y == food_y;
        if (has_eaten){
            make_food();
        }
    });
};
 
const draw_food = () =>{
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(food_x, food_y, 10, 10);
    ctx.strokeRect(food_x, food_y, 10, 10);
};

const gameEnded =()=>{
    for (let i = 4; i < snake.length; i++){
        const has_collided  = snake[i].x == snake[0].x && snake[i].y == snake[0].y;
        if (has_collided){
            return true;
        }
    }

    const hit_left = snake[0].x < 0;
    const hit_right = snake[0].x > canvas.width - 10;
    const hit_top = snake[0].y < 0;
    const hit_bottom = snake[0].y > canvas.height - 10;

    return hit_left || hit_right || hit_top || hit_bottom
}


function main(){
    if (gameEnded()){
        alert('game ended');
        return;
    };

    changing_direction = false;
    setTimeout(function onTick(){
        drawCanvas(canvas.width, canvas.height);
        draw_food();
        moveSnake();
        drawSnake();
        main();
    }, 100);
}


document.addEventListener("keydown", changeDirection);

window.addEventListener('DOMContentLoaded', (event) => {
	main();
    make_food();
});
