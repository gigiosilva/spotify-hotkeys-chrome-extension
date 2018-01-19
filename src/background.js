function onCommand(command) {
  chrome.tabs.query({url: 'https://www.youtube.com/*'}, function(tabs) {

    // Open a youtube tab if one does not exist yet.
    if (tabs.length === 0) {
      chrome.tabs.create({url: 'https://www.youtube.com'});
    }

    // Apply command on all youtube tabs.
    for (var tab of tabs) {
        console.log(tab.url)

      var code = '';
      if (tab.url.startsWith('https://www.youtube.com')) {

        chrome.tabs.executeScript(tab.id, {
          file: 'scripts/content.js'
        });

        switch (command) {
          case 'next': code = 'document.querySelector(".ytp-next-button").click()'; break;
          case 'previous': code = 'window.history.back()'; break;
          //case 'previous': code = 'document.querySelector(".ytp-prev-button").click()'; break;
          case 'play-pause': code = 'document.querySelector(".ytp-play-button").click()'; break;
          case 'mute-unmute': code = 'document.querySelector(".ytp-mute-button").click()'; break;
          case 'repeat': code = 'document.querySelector("#ce-repeat").click()'; break;
        }
      }
      if (code.length) {
        chrome.tabs.executeScript(tab.id, {code: code});
      }
    }

    // Unload background page as soon as we're done.
    window.close();
  });
};

chrome.commands.onCommand.addListener(onCommand);
