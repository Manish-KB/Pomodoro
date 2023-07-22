
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
const blockedWebsites = message.blockedWebsites;
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        const url = details.url.toLowerCase();
        for (const website of blockedWebsites) {
            if (url.startsWith(website.toLowerCase()) || url.includes(website.toLowerCase())) {
                console.log(blockedWebsites);
                return {redirectUrl: chrome.extension.getURL("blocked.html")};
            }
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
)

}
)