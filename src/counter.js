const { ipcRenderer } = require('electron');

let counterTime = 0;
ipcRenderer.on('action-set-counter', (event, arg) => {
    counterTime = arg;
})

function addLeadingZero(number) {
    if (number < 10) {
        return '0'.concat(number);
    } else {
        return number;
    }
}

function countDown() {
    const separator = ":";
    setInterval(() => {
        if (counterTime === 0) {
            document.getElementById("counter").innerText = "TIME IS UP";
        } else if (counterTime > 0) {
            let hours = addLeadingZero(Math.floor(counterTime / 3600));
            let mins = addLeadingZero(Math.floor((counterTime % 3600) / 60));
            let secs = addLeadingZero(Math.floor((counterTime % 3600) % 60));
            document.getElementById("counter").innerText = hours.toString().concat(
                separator, mins, separator, secs
            );
            counterTime -= 1;
        } else {
            document.getElementById("counter").innerText = "Chill :-).";
        }
    }, 1000);
}

countDown();
