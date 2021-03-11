initLangSelect();

async function initLangSelect() {
    const langSelect = document.querySelector('#hidden-lang-select');

    const langs = await getLangs();
    langs.unshift('');
    langs.forEach(lang => {
        let option = document.createElement('option');
        option.value = option.innerText = lang;
        langSelect.appendChild(option);
    });

    langSelect.value = await getCurrentHiddenLang();
    hideLang(langSelect.value);
    langSelect.addEventListener('change', _ => hideLang(langSelect.value));
}

function getLangs() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { func: "getLangs" }, (response) => {
                if (response?.langs) {
                    resolve(response.langs);
                } else {
                    reject('error');
                }
            });
        });
    });
}

function getCurrentHiddenLang() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { func: "getCurrentHiddenLang" }, (response) => {
                if (response) {
                    resolve(response.lang);
                } else {
                    reject('error');
                }
            });
        });
    });
}

function hideLang(lang) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { func: "hideLang", args: [lang] });
    });
}