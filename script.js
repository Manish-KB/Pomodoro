const myCheckbox = document.getElementById("myCheckbox");
const blockdiv = document.getElementById("blockdiv");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const displayMessage = document.querySelector("#message h2");
const timerInput = document.getElementById("timerInput");
const timerdiv=document.getElementById("timerDiv");
let timerInterval;


myCheckbox.addEventListener("click", function () {
  console.log("Checked");
  if (myCheckbox.checked) {
    blockdiv.style.display = "block";
  } else {
    blockdiv.style.display = "none";
  }
});





startButton.addEventListener("click", function () {

  const timerDuration = parseFloat(timerInput.value).toFixed(1);
  const timerDurationMs = timerDuration * 60 * 1000;
  console.log("Duration Min: ", timerDuration)
  console.log("Duration: ", timerDurationMs)
  if (isNaN(timerDuration) || timerDuration <= 0) {
    alert("Invalid timer duration. Please enter a valid positive number.");
    return;
  }

  const blockedWebsitesText = document.getElementById("blockedWebsites").value;
  const blockedWebsites = blockedWebsitesText.split(/\n/);
  chrome.runtime.sendMessage({ action: "startBlocking", blockedWebsites: blockedWebsites, timerDuration: timerDurationMs });
  chrome.storage.local.set({ isBlocked: true });

}
)
stopButton.addEventListener("click", function () {
  // chrome.runtime.reload()
  console.log("Stop");
  chrome.runtime.sendMessage({ action: "stopBlocking" });
  chrome.storage.local.set({ isBlocked: false });

});




chrome.storage.local.get(["isBlocked"], function (data) {
  console.log("Heloooooo");
  if (data.isBlocked === false) {
    startButton.style.display = "block";
    stopButton.style.display = "none";
    myCheckbox.style.display = "block";
    timerdiv.style.display="block";
    displayMessage.textContent = "Do you want to block websites";
  } else {
    startButton.style.display = "none";
    stopButton.style.display = "block";
    myCheckbox.style.display = "none";
    displayMessage.textContent = "Work Time" ;

    timerdiv.style.display="none";
  }
});

