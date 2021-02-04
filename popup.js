let btnElem = document.querySelector('#hide-btn');
let inputElem = document.querySelector('#hidden-langs');

btnElem.addEventListener('click', () => {
    const lang = inputElem.value;
    console.log('hide lang: ' + lang);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                code:
                    `styleElem = document.querySelector('#dbaranovskiy-gt-ext-style');
                    if (!styleElem) {
                        styleElem = document.createElement('style');
                        styleElem.id = 'dbaranovskiy-gt-ext-style'
                        document.head.appendChild(styleElem);
                    }
                    styleElem.innerHTML = 'li span[lang="${lang}"] { color: transparent; transition: color 0.3s; }' +
                    'li span[lang="${lang}"]:hover { color: #5f6368; }' `
            });
    });
});