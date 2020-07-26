document.addEventListener('keypress', logKey);

function logKey(event) {
    let strOut = '';
    if(event.ctrlKey === true) strOut += 'Ctrl+';
    if(event.shiftKey === true) strOut += 'Shift+';
    if(event.altKey === true) strOut + 'Att+';
    strOut += event.code;
    document.getElementById('output').innerText = strOut;
}

