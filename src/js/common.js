// Constants
// -----------------------------------------------------------
// HTML Time visualization
const SEQUENCE_ID = 'sequenceView';
const SPEAKER_MESSAGE = {
    stop: 'STOP',
    chill: 'CHILL ;-)'
};

// HTML IDs of time form fields for hours, minutes and seconds
const HOURS = 'hours';
const MINUTES = 'minutes';
const SECONDS = 'seconds';

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

// Transforms the hours, minutes and seconds to the seconds, ex.: 01:01:01 -> 3661 seconds
function transform2Seconds(document) {
    return Number(document.getElementById(HOURS).value) * 3600 +
        Number(document.getElementById(MINUTES).value) * 60 +
        Number(document.getElementById(SECONDS).value);
}

// Transforms the seconds to hours, minutes and seconds, ex.: 3661 -> 01:01:01
function transform2TimeString(time) {
    const hours = addLeadingZero(Math.floor(time / 3600));
    const minutes = addLeadingZero(Math.floor((time % 3600) / 60));
    const seconds = addLeadingZero(Math.floor((time % 3600) % 60));

    return `${hours}:${minutes}:${seconds}`;
}

// Function that visualizes the counter
function setCounter(document, id, message) {
    document.getElementById(id).innerText = message;
}

// Function that visualizes the sequence list
function setSequence(document, timer) {
    let res = `[\n`;
    for (let i = 0; i < timer.sequence.length; i++) {
        res += `${i}. : ${transform2TimeString(timer.sequence[i])}`

        // Add arrow pointing to the current index
        if (i === timer.index) {
            res += ` <---\n`;
        } else {
            res += `\n`;
        }
    }
    res += `]`;
    document.getElementById(SEQUENCE_ID).innerText = res;
}

// Function that runs each second to update visualized global counter variable (controlTime) value
function countDown(document, id, timeDict) {
    if (timeDict.counter === 0) {
        setCounter(document, id, SPEAKER_MESSAGE.stop);
    } else if (timeDict.counter > 0) {
        // Visualize current counter time
        setCounter(document, id, transform2TimeString(timeDict.counter));

        // Decrease counter by 1 seconds
        timeDict.counter -= 1;
    } else if (timeDict.counter === -1) {
        setCounter(document, id, SPEAKER_MESSAGE.chill);
    } else {
        setCounter(document, id, `Unknown value of counter: [${timeDict.counter}].`);
    }
}

// Export functions
module.exports = {
    countDown,
    transform2Seconds,
    setSequence
}