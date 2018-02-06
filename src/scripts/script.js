function onInitialize() {
    chrome.commands.getAll(values => {

        var itens = '';

        values.shift();

        values.forEach(hk => {
            itens += `
            <div class="container-item">
                <div class="hotkey-title">
                    <span>${hk.description}</span>
                </div>
                <div class="hotkey-key">
                    <input type="text" value="${hk.shortcut}" readonly>
                </div>
            </div>
            `
        });

        document.getElementsByClassName("container-body")[0].insertAdjacentHTML('beforeend', itens);
    });

    document.getElementsByClassName("container-foot")[0].addEventListener("click", () => {
        var newURL = "chrome://extensions/configureCommands";
        chrome.tabs.create({ url: newURL });
    });
}