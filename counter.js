function initCounter() {
    let count = 0;

    document.addEventListener('keyup', (e) => {
        if (e.key == '+') {
            showCounter(++count, 300);
        } else if (e.key == '-') {
            showCounter(--count, 300);
        } else if (e.key == '=') {
            showCounter(count, 3000);
        }
    });
}

showCounter = (function() {
    const counterElem = document.createElement('div');
    counterElem.classList.add('dbaranovsky97_gt-ext_counter');
    counterElem.style.opacity = '0';
    document.body.appendChild(counterElem);

    let lastTimeoutId = 0;

    return function(count, time) {
        counterElem.style.opacity = '1';
        clearTimeout(lastTimeoutId);
        counterElem.innerText = count;
        lastTimeoutId = setTimeout(() => {
            counterElem.style.opacity = '0';
        }, time);
    }
})();

initCounter();
