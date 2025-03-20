const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const focusBtn = document.getElementById("focus");
const breakBtn = document.getElementById("break");
const charIcon = document.getElementById("icon");
let isRunning = false;
let timerInterval;
let pomodoroCount = 0;
let startTime;
let endTime;

const imgList = [
    url('../img/1.png'),
];

window.addEventListener("load", function () {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("content").style.display = "block";
    updateTimer(1500);
});

function updateTimer(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function calculateTimeLeft() {
    const now = new Date();
    return Math.max(0, Math.round((endTime - now) / 1000));
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = "Pause";

        const duration = pomodoroCount % 2 === 0 ? 1500 : 300;
        startTime = new Date();
        endTime = new Date(startTime.getTime() + duration * 1000);

        timerInterval = setInterval(() => {
            const timeLeft = calculateTimeLeft();
            if (timeLeft > 0) {
                updateTimer(timeLeft);
            } else {
                clearInterval(timerInterval);
                document.getElementById("notification").play();
                isRunning = false;
                startBtn.textContent = "Start";
                pomodoroCount++;
                startTimer();
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.textContent = "Resume";
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = "Start";
    pomodoroCount = 0;
    updateTimer(1500);
}

function breakTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = "Start";
    pomodoroCount = 1;
    updateTimer(300);
    charIcon.src = getRandom();
}

function focusTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = "Start";
    pomodoroCount = 0;
    updateTimer(1500);
    charIcon.src = getRandom();
}

// change the icon to a random image from the image list.
function getRandom() {
    const randomIndice = Math.floor(Math.random() * imgList.length);
    return imgList[randomIndice];
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
focusBtn.addEventListener("click", focusTimer);
breakBtn.addEventListener("click", breakTimer);