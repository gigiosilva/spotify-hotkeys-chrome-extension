function onCommand(command) {
  chrome.tabs.query({url: 'https://www.youtube.com/*'}, function(tabs) {

    // Open a youtube tab if one does not exist yet.
    if (tabs.length === 0) {
      chrome.tabs.create({url: 'https://www.youtube.com'});
    }

    // Apply command on all youtube tabs.
    for (var tab of tabs) {

      var code = '';
      
      if (tab.url.startsWith('https://www.youtube.com')) {

        switch (command) {
          case 'next': {
            chrome.browserAction.setIcon({path:"/assets/icon-mini.png"});
            code = 'document.querySelector(".ytp-next-button").click()'; break;
          }
          case 'previous': {
            chrome.browserAction.setIcon({path:"/assets/icon-mini.png"});
            code = 'window.history.back()'; break;
          } 
          //case 'previous': code = 'document.querySelector(".ytp-prev-button").click()'; break;
          case 'play-pause': code = 'document.querySelector(".ytp-play-button").click()'; break;
          case 'mute-unmute': code = 'document.querySelector(".ytp-mute-button").click()'; break;
          case 'repeat': {

            chrome.tabs.executeScript(tab.id, {code: 'document.querySelector("[role=menuitemcheckbox]").getAttribute("aria-checked")'}, res => {
              var repeat = JSON.parse(res[0]);
              if(!repeat) {
                chrome.browserAction.setIcon({path:"/assets/icon-repeat-mini.png"});
              } else {
                chrome.browserAction.setIcon({path:"/assets/icon-mini.png"});
              }
            });

            code = 'document.querySelector("[role=menuitemcheckbox] .ytp-menuitem-label").click()'; break;
          }
        }
      }
      if (code.length) {
        chrome.tabs.executeScript(tab.id, {code: code});
      }
    }

    // Unload background page as soon as we're done.
    //window.close();
  });
};

chrome.commands.onCommand.addListener(onCommand);
