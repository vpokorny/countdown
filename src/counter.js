const { ipcRenderer } = require('electron');
const separator = ":";

let time = 0;
ipcRenderer.on('action-set-counter', (event, arg) => {
    time = arg;
})

function addLeadingZero(number) {
    if (number < 10) {
        return '0'.concat(number);
    } else {
        return number;
    }
}

function countDown() {
    setInterval(() => {
        if (time === 0) {
            document.getElementById("counter").innerText = "TIME IS UP";
        } else if (time > 0) {
            let hours = addLeadingZero(Math.floor(time / 3600));
            let mins = addLeadingZero(Math.floor((time % 3600) / 60));
            let secs = addLeadingZero(Math.floor((time % 3600) % 60));
            document.getElementById("counter").innerText = hours.toString().concat(
                separator, mins, separator, secs
            );
            time -= 1;
        } else {
            document.getElementById("counter").innerText = "Chill :-).";
        }
    }, 1000);
}

countDown();
