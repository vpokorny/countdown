const { ipcRenderer } = require('electron');

let controlTime = 0;
const startBtn = document.getElementById('startBtn');
startBtn.onclick = e => {
    let temp = 0;
    temp += Number(document.getElementById("hours").value) * 3600;
    temp += Number(document.getElementById("minutes").value) * 60;
    temp += Number(document.getElementById("seconds").value);
    controlTime = temp;
    // document.getElementById('secs').innerText = Number(document.getElementById("minutes").value).toString();
    ipcRenderer.send('request-set-counter', temp)
}

const stopBtn = document.getElementById('stopBtn');
stopBtn.onclick = e => {
    controlTime = 0;
    ipcRenderer.send('request-set-counter', 0)
}

const chillBtn = document.getElementById('chillBtn');
chillBtn.onclick = e => {
    controlTime = -1;
    ipcRenderer.send('request-set-counter', -1)
}

function addLeadingZero(number) {
    if (number < 10) {
        return '0'.concat(number);
    } else {
        return number;
    }
}

function countDown() {
    const separator = ':';
    setInterval(() => {
        if (controlTime === 0) {
            document.getElementById("counterView").innerText = "TIME IS UP";
        } else if (controlTime > 0) {
            let hours = addLeadingZero(Math.floor(controlTime / 3600));
            let mins = addLeadingZero(Math.floor((controlTime % 3600) / 60));
            let secs = addLeadingZero(Math.floor((controlTime % 3600) % 60));
            document.getElementById("counterView").innerText = hours.toString().concat(
                separator, mins, separator, secs
            );
            controlTime -= 1;
        } else {
            document.getElementById("counterView").innerText = "Chill :-).";
        }
    }, 1000);
}

countDown();
