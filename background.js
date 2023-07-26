let blockingListener = null;
let isBlocking = false
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "startBlocking") {

    startTimer(message.timerDuration);
    startBlocking(message.blockedWebsites);
    isBlocking = true
    showNotification("Timer Started","Blocking websites!");
  }
  else if (message.action === "stopBlocking") {
    isBlocking = false
    showNotification("Break Time!","Website blocking has stopped!");
    stopBlocking();
  }

});



function startBlocking(blockedWebsites) {
  {
    blockingListener = chrome.webRequest.onBeforeRequest.addListener(
      function (details) {
        const url = details.url.toLowerCase();
        for (const website of blockedWebsites) {
          if (url.startsWith(website.toLowerCase()) || url.includes(website.toLowerCase())) {
            console.log(blockedWebsites);
            return { redirectUrl: chrome.extension.getURL("blocked.html") };
          }
        }
      },
      { urls: ["<all_urls>"] },
      ["blocking"]
    );
  }

  console.log(blockingListener)

}


function stopBlocking() {

  chrome.storage.local.set({ isBlocked: false });
  setTimeout(function () {
    chrome.runtime.reload();
  }, 500);

  if (blockingListener) {

    chrome.webRequest.onBeforeRequest.removeListener(blockingListener);
    blockingListener = null;

  }
}


let startTime = null;
let duration = 0;
function startTimer(timerDuration) {
  startTime = new Date();
  console.log("Timer started at: " + startTime.toLocaleTimeString());
  duration = timerDuration
  console.log("Duration: ", duration)

  setTimeout(stopTimer, duration);

}


function stopTimer() {
  if (!startTime) {
    console.log("Timer hasn't started yet.");
    return;
  }

  let currentTime = new Date();
  let elapsedTime = Math.round((currentTime - startTime) / 1000); // Convert to seconds
  console.log("Elapsed time: " + elapsedTime + " seconds");
  showNotification("Break Time!","Well Done!");
  stopBlocking();

  let percentage = (elapsedTime / (duration / 60)) * 100;
  percentage = Math.min(percentage, 100);
  updateProgressBar(percentage);

}

function showNotification(title,message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "logo.png",
    title: title,
    message: message,
  });

}





