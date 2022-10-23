class Popup {
	_select;

	constructor() {
		this._initSelect();
	}

	async _initSelect() {
		const select = document.querySelector("#lang-select");
		const langs = await this._makeRequestToPage("getLangs");
		["", ...langs].forEach((lang) => {
			let option = document.createElement("option");
			option.value = option.innerText = lang;
			select.appendChild(option);
		});
		select.value = localStorage.getItem("gt-check-yourself") ?? "";
		await this._hideLang(select.value);
		select.addEventListener(
			"change",
			async () => await this._hideLang(select.value)
		);
	}

	_hideLang(lang) {
		localStorage.setItem("gt-check-yourself", lang);
		this._makeRequestToPage("hideLang", [lang]);
	}

	_makeRequestToPage(method, args) {
		return chrome.tabs
			.query({ active: true, currentWindow: true })
			.then((tabs) => chrome.tabs.sendMessage(tabs[0].id, { method, args }));
	}
}

const popup = new Popup();
