const { ipcRenderer } = require('electron');

// Path relative from the HTML file 'control.html'
const common = require('../js/common.js');

// Global variables
// -------------------------------------------
// Global variable for control time in seconds
// Ex.: value 3600 => 3600 seconds = 1 hour
let controlTimer = {
    counter: 0,
    index: 0,
    sequence: []
};

// Button actions
// ------------------------
// HTML IDs of action buttons
const SET_BUTTON = 'setBtn';
const STOP_BUTTON = 'stopBtn';
const CHILL_BUTTON = 'chillBtn';
const ADD_TO_SEQ_BUTTON = 'addToSeqBtn';
const REMOVE_TO_SEQ_BUTTON = 'removeFromSeqBtn';
const PREV_SEQ_BUTTON = 'prevSeqBtn';
const START_SEQ_BUTTON = 'startSeqBtn';
const NEXT_SEQ_BUTTON = 'nextSeqBtn';
const COUNTER_CONTROL_ID = 'counterControl';


// General button action
function setTime(counter) {
    // TODO: add documenting docstring
    controlTimer.counter = counter;
    ipcRenderer.send('request-set-counter', counter);
}

// Add action to the Start button
// Action:
//  - Set the global counter to inserted seconds (hours and minutes are transferred to second unit)
const setBtn = document.getElementById(SET_BUTTON);
setBtn.onclick = () => {
    setTime(
        common.transform2Seconds(document)
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

// Add action to the Add to Sequence button
// Action:
//  - Append the time at the end of the time sequence
const addToSeqBtn = document.getElementById(ADD_TO_SEQ_BUTTON);
addToSeqBtn.onclick = () => {
    controlTimer.sequence.push(
        {
            duration: common.transform2Seconds(document),
            description: ""
        }
    );
    console.log(`Adding to the sequence: ${controlTimer.sequence}.`);
    common.setSequence(document, controlTimer);
}

// Add action to the Remove from Sequence button
// Action:
//  - Pop the time from the end of the time sequence
const removeFromSeqBtn = document.getElementById(REMOVE_TO_SEQ_BUTTON);
removeFromSeqBtn.onclick = () => {
    controlTimer.sequence.pop();
    console.log(`Removing from the sequence: ${controlTimer.sequence}.`);
    common.setSequence(document, controlTimer);
}

// Add action to the Next Sequence button
// Action:
//  - Increases the index by 1 in case the end of the sequence has not been reached and the first value from the sequence list and set it as the counter.
const nextSeqBtn = document.getElementById(NEXT_SEQ_BUTTON);
nextSeqBtn.onclick = () => {
    if ((controlTimer.index + 1) < controlTimer.sequence.length) {
        controlTimer.index++;
        setTime(controlTimer.sequence[controlTimer.index].duration)
        common.setSequence(document, controlTimer);
    } else {
        console.log(
            `The length of sequence is ${controlTimer.sequence.length} and
             the index is ${controlTimer.index}, you have reached the index of the last item.`
        );
    }
}

// Add action to the Start Sequence button
// Action:
//  - Starts the counter on the current index
const startSeqBtn = document.getElementById(START_SEQ_BUTTON);
startSeqBtn.onclick = () => {
    setTime(controlTimer.sequence[controlTimer.index].duration)
    common.setSequence(document, controlTimer);
}

// Add action to the Previous Sequence button
// Action:
//  - Decrease the index by 1 and set the counter in case it reaches the first item on index 0.
const prevSeqBtn = document.getElementById(PREV_SEQ_BUTTON);
prevSeqBtn.onclick = () => {
    if ((controlTimer.index - 1) >= 0) {
        controlTimer.index--;
        setTime(controlTimer.sequence[controlTimer.index].duration);
        common.setSequence(document, controlTimer);
    } else {
        console.log(
            `The length of sequence is ${controlTimer.sequence.length} and
             the index is ${controlTimer.index}, you have reached the index of the first item.`
        );
    }
}

// Start the counter function
setInterval(() => {
    common.countDown(document, COUNTER_CONTROL_ID, controlTimer);
}, 1000);
