function onInitialize() {

}

function setRepeatIcon() {
    chrome.runtime.sendMessage({ "newIconPath" : folder + icons[2] });
}