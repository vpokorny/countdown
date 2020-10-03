const { ipcRenderer } = require('electron');

const startBtn = document.getElementById('startBtn');
startBtn.onclick = e => {
    let time = 0;
    time += Number(document.getElementById("hours").value) * 3600;
    time += Number(document.getElementById("minutes").value) * 60;
    time += Number(document.getElementById("seconds").value);
    document.getElementById('secs').innerText = Number(document.getElementById("minutes").value).toString();
    ipcRenderer.send('request-set-counter', time)
}

const stopBtn = document.getElementById('stopBtn');
stopBtn.onclick = e => {
   ipcRenderer.send('request-set-counter', 0)
}

const chillBtn = document.getElementById('chillBtn');
chillBtn.onclick = e => {
    ipcRenderer.send('request-set-counter', -1)
}