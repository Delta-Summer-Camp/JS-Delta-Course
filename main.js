document.addEventListener('keydown', processKey);
const STEP = 10;
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

    bSquare.style.left = x + 'px';
    bSquare.style.top = y + 'px';

    return true;
}