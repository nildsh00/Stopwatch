let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    let milliseconds = parseInt(ms % 1000);
    let seconds = parseInt((ms / 1000) % 60);
    let minutes = parseInt((ms / (1000 * 60)) % 60);
    let hours = parseInt((ms / (1000 * 60 * 60)) % 24);

    milliseconds = milliseconds.toString().padStart(3, '0');
    seconds = seconds.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    hours = hours.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
    running = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
}

function stop() {
    clearInterval(timerInterval);
    running = false;
    startButton.disabled = false;
    stopButton.disabled = true;
}

function reset() {
    stop();
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.000';
    lapsContainer.innerHTML = '';
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function lap() {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    lapElement.textContent = `Lap: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
