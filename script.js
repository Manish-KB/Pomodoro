const myCheckbox = document.getElementById("myCheckbox");
const blockdiv = document.getElementById("blockdiv");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
let timerInterval;

// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) {
//       if (details.url.includes("www.google.com")) {
//         return { redirectUrl: chrome.extension.getURL("blocked.html") };
//       }
//     },
//     { urls: ["<all_urls>"] },
//     ["blocking"]
//   );


myCheckbox.addEventListener("click", function () {
    console.log("Checked");
    if (myCheckbox.checked) {
        blockdiv.style.display = "block";
    } else {
        blockdiv.style.display = "none";
    }
});

startButton.addEventListener("click", function () {

    const blockedWebsitesText = document.getElementById("blockedWebsites").value;
    const blockedWebsites = blockedWebsitesText.split(/\n/) ; 
    chrome.runtime.sendMessage({action: "startBlocking" ,blockedWebsites: blockedWebsites });
   
}
)
stopButton.addEventListener("click", function () {
    chrome.runtime.reload()
    console.log("Stop");
    chrome.runtime.sendMessage({ action: "stopBlocking" });
});
