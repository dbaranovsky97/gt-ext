(async function () {
    const hiddenLangSelect = document.querySelector('#hidden-lang-select');

    const langs = await loadLangs();
    langs.unshift('');
    langs.forEach(lang => {
        let option = document.createElement('option');
        option.value = option.innerText = lang;
        hiddenLangSelect.appendChild(option);
    });

    hiddenLangSelect.value = await getLastHiddenLang();
    hideLang(hiddenLangSelect.value);
    hiddenLangSelect.addEventListener('change', _ => hideLang(hiddenLangSelect.value));

})();

function loadLangs() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { func: "loadLangs" }, (response) => {
                console.log('available langs:');
                console.log(response);

                if (response?.langs) {
                    resolve(response.langs);
                } else {
                    reject('error');
                }
            });
        });
    });
}

function getLastHiddenLang() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['hideLang_lastValue'], function (result) {
            resolve(result?.hideLang_lastValue);
        });
    });
}

function hideLang(lang) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { func: "hideLang", args: [lang] });
    });

    chrome.storage.sync.set({ hideLang_lastValue: lang }, function () { });
}