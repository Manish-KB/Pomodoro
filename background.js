let blockingListener = null;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "startBlocking") {
        startBlocking(message.blockedWebsites);
    } else if (message.action === "stopBlocking") {
    
    }
});

function startBlocking(blockedWebsites) {
    if (!blockingListener) {
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
}

function stopBlocking() {
    chrome.runtime.reload()
    if (blockingListener) {
        chrome.webRequest.onBeforeRequest.removeListener(blockingListener);
        blockingListener = null;
    }
}
