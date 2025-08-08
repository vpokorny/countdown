const { ipcRenderer } = require('electron');

// Path relative from HTML file 'counter.html'
const common = require('../js/common');

// Constants
const COUNTER_SHOW_ID = 'counterShow';
const CANVAS_SHOW_ID = 'cvs';

// Define the object (not a simple variable like number)
let showTime = {
    counter: 0,
    duration: 0
};
ipcRenderer.on('action-set-counter', (event, arg) => {
    showTime.counter = Number(arg);
    showTime.duration = Number(arg);
})

// Start the counter function
setInterval(() => {
    // common.countDown(document, COUNTER_SHOW_ID, showTime);
    common.countDownCircle(document, CANVAS_SHOW_ID, showTime)
}, 1000);
