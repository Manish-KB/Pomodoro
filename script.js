const blockdiv = document.getElementById("blockdiv");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const displayMessage = document.querySelector("#message p");
const timerInput = document.getElementById("timerInput");
const timerdiv = document.getElementById("timerDiv");
let timerInterval;
const textbox = document.getElementById('blockedWebsites')
const switchInput = document.getElementById("flexSwitchCheckDefault");

switchInput.addEventListener("change", function () {
  const isChecked = switchInput.checked;
  if (isChecked) {
    const timerDuration = parseFloat(timerInput.value).toFixed(1);
    const timerDurationMs = timerDuration * 60 * 1000;
    console.log("Duration Min: ", timerDuration)
    console.log("Duration: ", timerDurationMs)
    if (isNaN(timerDuration) || timerDuration <= 0) {
      switchInput.checked = false
      alert("Invalid timer duration. Please enter a valid positive number.");
      return;
    }

    const blockedWebsitesText = document.getElementById("blockedWebsites").value;
    const blockedWebsites = blockedWebsitesText.split(/\n/);

    if (blockedWebsites.length > 0 && blockedWebsites[0].trim() !== "") {
      chrome.runtime.sendMessage({ action: "startBlocking", blockedWebsites: blockedWebsites, timerDuration: timerDurationMs });
      chrome.storage.local.set({ isBlocked: true });
    }
    else {
      switchInput.checked = false
      alert("Please enter the website URLs");
    }
  }
  else {
    console.log("Stop");
    chrome.runtime.sendMessage({ action: "stopBlocking" });
    chrome.storage.local.set({ isBlocked: false });


  }
}
)





chrome.storage.local.get(["isBlocked"], function (data) {
  console.log("Heloooooo");
  if (data.isBlocked === false) {

    switchInput.checked = false
    timerdiv.style.display = "block";
    displayMessage.textContent = "Enter websites to be blocked";
    textbox.style.display = "block";
  } else {

    switchInput.checked = true
    displayMessage.textContent = "Work Time";
    textbox.style.display = "none";
    timerdiv.style.display = "none";
  }
});

