(function () {
    const langs = parseLangsFromPage();

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.func == 'hideLang') {
                hideLang(...request.args);
            } else if (request.func == 'loadLangs') {
                sendResponse({ langs });
            }
        }
    );
})();

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
