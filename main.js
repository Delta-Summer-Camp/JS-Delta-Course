document.addEventListener('keydown', processKey);
const STEP = 30;
const X_MAX = 770;
const Y_MAX = 770;
const bSquare = document.getElementById('blackSquare');

function processKey(ev) {
    let key = ev.keyCode;

    let x = bSquare.offsetLeft;
    let y = bSquare.offsetTop;

    switch (key) {
        case 37: // left
            x -= STEP;
            break;
        case 38: //up
            y -= STEP;
            break;
        case 39: // right
            x += STEP;
            break;
        case 40: // down
            y += STEP;
            break;
        default:
            return false;
    }

    if (x < 0) x = 0;
    else if (x > X_MAX) x = X_MAX;
    if (y < 0) y = 0;
    else if (y > Y_MAX) y = Y_MAX;

    bSquare.style.left = x + 'px';
    bSquare.style.top = y + 'px';

    return true;
}