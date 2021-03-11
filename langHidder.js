listenExtension();

function listenExtension() {
    const langs = parseLangsFromPage();
    let currentHiddenLang = '';

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.func == 'hideLang') {
            hideLang(request.args[0]);
            currentHiddenLang = request.args[0];
        } else if (request.func == 'getLangs') {
            sendResponse({ langs });
        } else if (request.func == 'getCurrentHiddenLang') {
            sendResponse({ lang: currentHiddenLang });
        }
    });
}

function hideLang(lang) {
    styleElem = document.querySelector('#dbaranovskiy-gt-ext-style');

    if (!styleElem) {
        styleElem = document.createElement('style');
        styleElem.id = 'dbaranovskiy-gt-ext-style'
        document.head.appendChild(styleElem);
    }

    styleElem.innerHTML =
        `[lang="${lang}"]
        {
            color: transparent; 
            transition: color 0.3s; 
        }

        [lang="${lang}"]:hover 
        { 
            color: #5f6368; 
        }`;
}

function parseLangsFromPage() {
    const elemsWithLang = document.querySelectorAll('[lang]');
    const langs = new Set();
    elemsWithLang.forEach(elem => {
        const lang = elem.getAttribute('lang');

        if (lang) {
            langs.add(lang);
        }
    });

    return [...langs];
}