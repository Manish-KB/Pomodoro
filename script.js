const myCheckbox = document.getElementById("myCheckbox");
const blockdiv = document.getElementById("blockdiv");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
let timerInterval;

myCheckbox.addEventListener("click", function () {
    console.log("Checked");
    if (myCheckbox.checked) {
        blockdiv.style.display = "block";
    } else {
        blockdiv.style.display = "none";
    }
});
