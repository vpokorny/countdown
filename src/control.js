const { ipcRenderer } = require('electron');


// Constants
// -----------------------------------------------------------
// HTML IDs of time form fields for hours, minutes and seconds
const HOURS = 'hours';
const MINUTES = 'minutes';
const SECONDS = 'seconds';

// HTML IDs of action buttons
const START_BUTTON = 'startBtn';
const STOP_BUTTON = 'stopBtn';
const CHILL_BUTTON = 'chillBtn';

// HTML Time visualization
const COUNTER_ID = 'counterView'
const SPEAKER_MESSAGE = {
    stop: 'STOP',
    chill: 'CHILL ;-)'
}


// Global variables
// -------------------------------------------
// Global variable for control time in seconds
// Ex.: value 3600 => 3600 seconds = 1 hour
let controlTime = 0;


// Button actions
// ------------------------
// General button action
function setTime(counter) {
    // TODO: add documenting docstring
    controlTime = counter;
    ipcRenderer.send('request-set-counter', counter);
}

// Add action to the Start button
// Action:
//  - Set the global counter to inserted seconds (hours and minutes are transferred to second unit)
const startBtn = document.getElementById(START_BUTTON);
startBtn.onclick = () => {
    setTime(
        Number(document.getElementById(HOURS).value) * 3600 +
        Number(document.getElementById(MINUTES).value) * 60 +
        Number(document.getElementById(SECONDS).value)
    );
}

// Add action to the Stop button
// Action:
//  - Reset global counter (controlTime) to 0 seconds
const stopBtn = document.getElementById(STOP_BUTTON);
stopBtn.onclick = () => {
    setTime(0);
}

// Add action to the Chill button
// Action:
//  - Set global counter to -1 (special value for chill mode)
const chillBtn = document.getElementById(CHILL_BUTTON);
chillBtn.onclick = () => {
    setTime(-1);
}

// Adds a leading zero in case the number is lower than 10 (so that the output is still aligned into format 00:00:00)
// Ex.:
//  - input: 8 -> output: '08'
//  - input 25 -> output: '25'
function addLeadingZero(number) {
    if (number < 10) {
        return `0${number}`;
    } else {
        return number;
    }
}


// Function that visualizes the counter
function setCounter(message) {
    document.getElementById(COUNTER_ID).innerText = message;
}

// Function that runs each second to update visualized global counter variable (controlTime) value
function countDown() {
    setInterval(() => {
        if (controlTime === 0) {
            setCounter(SPEAKER_MESSAGE.stop);
        } else if (controlTime > 0) {
            // Calculate back from counter current hours, minutes, and seconds
            const hours = addLeadingZero(Math.floor(controlTime / 3600));
            const minutes = addLeadingZero(Math.floor((controlTime % 3600) / 60));
            const seconds = addLeadingZero(Math.floor((controlTime % 3600) % 60));

            // Visualize current counter time
            setCounter(`${hours}:${minutes}:${seconds}`);

            // Decrease counter by 1 seconds
            controlTime -= 1;
        } else if (controlTime === -1) {
            setCounter(SPEAKER_MESSAGE.chill);
        } else {
            setCounter(`Unknown value of counter: [${controlTime}].`);
        }
    }, 1000);
}

// Start the counter function
countDown();
