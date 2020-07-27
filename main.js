document.addEventListener('keydown', processKey);
const STEP = 10;
const GAME_SIZE = 840;
const SQUARE_SIZE = 30;
const X_MAX = GAME_SIZE - SQUARE_SIZE;
const Y_MAX = GAME_SIZE - SQUARE_SIZE;
const BOLL_SIZE = 20;
const BOLL_X = 100;
const BOLL_Y = 50;
const V_MIN = 5;
const V_MAX = 20;
let vx;
let vy;
const INTERVAL = 50;
const bSquare = document.getElementById('blackSquare');
let isRunning = false;
let timer;

// текущее положение мяча
let bx = BOLL_X;
let by = BOLL_Y;

// текущее положение ракетка
let sqx = bSquare.offsetLeft;
let sqy = bSquare.offsetTop;

function init() {
    const ga = document.getElementById('gameArea');
    ga.style.width = ga.style.height = GAME_SIZE + 'px';
    bSquare.style.width = bSquare.style.height = SQUARE_SIZE + 'px'
    const bl = document.getElementById('boll');
    bl.style.width = bl.style.height = BOLL_SIZE + 'px';
    bl.style.borderRadius = Math.floor(BOLL_SIZE / 2) + 'px';
    bl.style.left = BOLL_X + 'px';
    bl.style.top = BOLL_Y + 'px';

    vx = Math.floor(Math.random() * (V_MAX - V_MIN)) + V_MIN;
    vy = Math.floor(Math.random() * (V_MAX - V_MIN)) + V_MIN;
}

function processKey(ev) {
    if(!isRunning) {
        startGame();
        isRunning = true;
    }
    let key = ev.keyCode;

    switch (key) {
        case 37: // left
            sqx -= STEP;
            break;
        case 38: //up
            sqy -= STEP;
            break;
        case 39: // right
            sqx += STEP;
            break;
        case 40: // down
            sqy += STEP;
            break;
        default:
            return false;
    }

    if (sqx < 0) sqx = 0;
    else if (sqx > X_MAX) sqx = X_MAX;
    if (sqy < 0) sqy = 0;
    else if (sqy > Y_MAX) sqy = Y_MAX;

    bSquare.style.left = sqx + 'px';
    bSquare.style.top = sqy + 'px';

    return true;
}

function startGame() {
    timer = setInterval(moveTheBoll, INTERVAL);
}

function moveTheBoll() {
    bx += vx;
    by += vy;
    if (bx < 0) {
        bx = 0;
        vx = - vx;
    } else if (bx > GAME_SIZE - BOLL_SIZE) {
        bx = GAME_SIZE - BOLL_SIZE;
        vx = - vx;
    }
    if (by < 0) {
        by = 0;
        vy = - vy;
    } else if (by > GAME_SIZE - BOLL_SIZE) {
        by = GAME_SIZE - BOLL_SIZE;
        vy = - vy;
    }
    const bl = document.getElementById('boll');
    bl.style.left = bx + 'px';
    bl.style.top = by + 'px';
}