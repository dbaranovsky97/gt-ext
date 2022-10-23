class Page {
	_style;
	_langs;

	constructor() {
		this._listenPopup();
	}

	_listenPopup() {
		chrome.runtime.onMessage.addListener(
			({ method, args }, sender, sendResponse) => {
				if (method == "hideLang") {
					this._hideLang(args[0]);
					return sendResponse();
				} else if (method == "getLangs") {
					if (!this._langs) {
						this._scanLangs();
					}
					return sendResponse(this._langs);
				}
				throw new Error(`unknown method '${method}'`);
			}
		);
	}

	_scanLangs() {
		const langs = new Set();
		document.querySelectorAll("[lang]").forEach((element) => {
			const lang = element.getAttribute("lang");
			if (lang) {
				langs.add(lang);
			}
		});
		this._langs = [...langs];
	}

	_hideLang(lang) {
		if (!this._style) {
			this._style = document.createElement("style");
			this._style.id = "gt-ext-style";
			document.head.appendChild(this._style);
		}
		this._style.innerHTML = lang
			? `[lang="${lang}"]:not(:hover)
            {
                color: transparent; 
                transition: color 0.3s; 
            }`
			: "";
	}
}

const page = new Page();
