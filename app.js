const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// size, position and speed of rendered items
const ballRadius = 7;
let ball_x = canvas.width / 2;
let ball_y = canvas.height - 30;
let delta_ball_x = .75;
let delta_ball_y = -.75;
let paddleWidth = 70;
let paddleHeight = 8;
let paddle_x = (canvas.width - paddleWidth) / 2;
let paddle_y = canvas.height - paddleHeight;
let delta_paddle_x = 1.25;

let rightKeyPressed;
let leftKeyPressed;

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball_x, ball_y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'pink';
    ctx.fill();
    ctx.closePath();
};

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddle_x, paddle_y, paddleWidth, paddleHeight);
    ctx.fillStyle = 'aquamarine';
    ctx.fill();
    ctx.closePath();
};


// paddle movement event listeners
const keyUpdHandler = (e) => {
    if (e.keyCode === 39) {
        rightKeyPressed = false;
    } else if (e.keyCode === 37) {
        leftKeyPressed = false;
    }
};

const keyDownHandler = (e) => {
    if (e.keyCode === 39) {
        rightKeyPressed = true;
    } else if (e.keyCode === 37) {
        leftKeyPressed = true;
    }
};

document.addEventListener('keyup', keyUpdHandler, false);
document.addEventListener('keydown', keyDownHandler, false);

const play = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();

    // check if the ball does hit the canvas border or paddle
    // last loop captures game over scenario
    if (ball_x + delta_ball_x > canvas.width - ballRadius || ball_x + delta_ball_x < ballRadius) {
        delta_ball_x = -delta_ball_x;
    }

    if (ball_y + delta_ball_y < ballRadius) {
        delta_ball_y = -delta_ball_y;
    }

    if (ball_y + delta_ball_y < ballRadius || (
        ball_y + delta_ball_y > canvas.height - paddleHeight - ballRadius &&
        ball_x + delta_ball_x > paddle_x &&
        ball_x + delta_ball_x < paddle_x + paddleWidth
    )) {
        delta_ball_y = -delta_ball_y;
    } else if (ball_y + delta_ball_y > canvas.height) {
        ctx.font = '20px arial';
        ctx.fillStyle = 'black';
        ctx.fillText("GAME OVER", 80, canvas.height / 2);
        return;
    }

    //move the paddle, validate borders
    if (rightKeyPressed && (paddle_x + paddleWidth) < canvas.width) {
        paddle_x += delta_paddle_x;
    } else if (leftKeyPressed && paddle_x > 0) {
        paddle_x -= delta_paddle_x;
    }

    // move the ball
    ball_x += delta_ball_x;
    ball_y += delta_ball_y;

    requestAnimationFrame(play);
};

// creates game loop
// takes a function as argument and fires it,
// whenever is browser ready to update next time.
// fires only once, so callback calls it again.
requestAnimationFrame(play);
