"use strict"

document.addEventListener('keydown', processKey);
const STEP = 10;
const GAME_SIZE = 840;
// const SQUARE_SIZE = 100;
let racketSizeX, racketSizeY; // ToDo: учесть размеры ракетки
const rX = 300;
const rY = 15;
// const X_MAX = GAME_SIZE - SQUARE_SIZE;
// const Y_MAX = GAME_SIZE - SQUARE_SIZE;
const X_MAX = GAME_SIZE - rX;
const Y_MAX = GAME_SIZE - rY;
const BALL_SIZE = 50;
const V_MIN = 5;
const V_MAX = 20;
let bx, by;
let vx, vy;
const INTERVAL = 50;
const bSquare = document.getElementById('blackSquare');
let isRunning = false;
let timer;

// текущее положение ракетка
let sqx = bSquare.offsetLeft;
let sqy = bSquare.offsetTop;

function init() {
    // Случайная генерация начальных значений
    bx = Math.floor(Math.random() * (GAME_SIZE - BALL_SIZE));
    by = Math.floor(Math.random() * (GAME_SIZE - BALL_SIZE));


    vx = Math.floor(Math.random() * (V_MAX - V_MIN)) + V_MIN;
    vy = Math.floor(Math.random() * (V_MAX - V_MIN)) + V_MIN;
    vx = (Math.random() < 0.5) ? -vx : vx;
    vy = (Math.random() < 0.5) ? -vy : vy;


    const ga = document.getElementById('gameArea');
    ga.style.width = ga.style.height = GAME_SIZE + 'px';
    // bSquare.style.width = bSquare.style.height = SQUARE_SIZE + 'px'
    bSquare.style.width = rX + 'px';
    bSquare.style.height = rY + 'px';
    const bl = document.getElementById('boll');
    bl.style.width = bl.style.height = BALL_SIZE + 'px';
    bl.style.borderRadius = Math.floor(BALL_SIZE / 2) + 'px';
    bl.style.left = bx + 'px';
    bl.style.top = by + 'px';
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

    testForCollision();

    return true;
}

function startGame() {
    timer = setInterval(moveTheBall, INTERVAL);
}

function moveTheBall() {
    bx += vx;
    by += vy;
    if (bx < 0) {
        bx = 0;
        vx = - vx;
    } else if (bx > GAME_SIZE - BALL_SIZE) {
        bx = GAME_SIZE - BALL_SIZE;
        vx = - vx;
    }
    if (by < 0) {
        by = 0;
        vy = - vy;
    } else if (by > GAME_SIZE - BALL_SIZE) {
        by = GAME_SIZE - BALL_SIZE;
        vy = - vy;
    }
    const bl = document.getElementById('boll');
    bl.style.left = bx + 'px';
    bl.style.top = by + 'px';

    testForCollision();
}

// Возвращает ответ на вопрос "столкнулись ли мячик с ракеткой?"
function testForCollision() {
    const sqCenterX = sqx + Math.floor(rX / 2);
    const sqCenterY = sqy + Math.floor(rY / 2);
    const bCenterX = bx + Math.floor(BALL_SIZE / 2);
    const bCenterY = by + Math.floor(BALL_SIZE / 2);

    const distanceX = sqCenterX - bCenterX;
    const distanceY = sqCenterY - bCenterY;

    if ((Math.abs(distanceX) <= (rX + BALL_SIZE) / 2) && (Math.abs(distanceY) <= (rY + BALL_SIZE) / 2)) {
        if (Math.abs(distanceX) > Math.abs(distanceY)) { // соударение произошло по горизонтали
            if (distanceX < 0) doCollision('r');
            else doCollision('l');
        } else {  // соударение произошло по вертикали
            if (distanceY < 0) doCollision('b');
            else doCollision('t');
        }
    }
}

// Обработка столкновений; direction - направление откуда прилетел мяч, может быть 'l', 'r', 't', 'b'
function doCollision(direction) {
    switch (direction) {
        case 'r':
            vx = Math.abs(vx);
            bx = sqx + rX;
            if (bx > GAME_SIZE - BALL_SIZE) bx = GAME_SIZE - BALL_SIZE;
            break;
        case 'l':
            vx = -1 * Math.abs(vx);
            bx = sqx - BALL_SIZE;
            if (bx < 0) bx = 0;
            break;
        case 't':
            vy = -1 * Math.abs(vy);
            by = sqy - BALL_SIZE;
            if (by < 0) by = 0;
            break;
        case 'b':
            vy = Math.abs(vy);
            by = sqy + rY;
            if (by > GAME_SIZE - BALL_SIZE) by = GAME_SIZE - BALL_SIZE;
            break;
    }
}