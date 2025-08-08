// Constants
// -----------------------------------------------------------
// HTML Time visualization
const SEQUENCE_ID = 'sequenceView';
const SPEAKER_MESSAGE = {
    stop: 'Time\'s up ⌛',
    chill: 'Relax 👌'
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

// Control panel: Function that visualizes the counter
function setCounter(document, id, message) {
    document.getElementById(id).innerText = message;
}

// Control panel: Function that visualizes the sequence list
function setSequence(document, timer) {
    let res = ``;
    for (let i = 0; i < timer.sequence.length; i++) {
        // Add arrow pointing to the current index
        let pointer = ``;
        if (i === timer.index) {
            pointer += `---->`;
        }

        res += `<tr>
                    <th scope="row">${i}</th>
                    <td>${pointer}</td>
                    <td>${transform2TimeString(timer.sequence[i].duration)}</td>
                    <td>${timer.sequence[i].description}</td>
                </tr>`;
    }
    document.getElementById(SEQUENCE_ID).innerHTML = res;
}

// Control panel: Function that runs each second to update visualized global counter variable (controlTime) value
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

// Counter: Function that picks the color based on provided percentage of counter / or special cases
function pickColorByPercentage(percentage) {
    // The percentage is above 100 % (special case)
    if (percentage > 100) {
        return '#BBBBBB'; // Grey

    // The counter above between 100 - 50 % of the countdown duration.
    } else if (percentage >= 50) {
         return '#28a745'; // Green

    // The counter is between 25 - 50 % of the countdown duration.
    } else if (percentage >= 25) {
        return '#17a2b8'; // Blue

    // The counter is between 10 - 25 % of the countdown duration.
    } else if (percentage >= 10) {
        return '#ffc107'; // Orange

    // The counter is under the 10% of the countdown duration + Time's up.
    } else if (percentage >= 0) {
        return '#dc3545'; // Red

    // Visualization of just text out of the counter (like percentage === -1, etc.) (special case)
    } else {
        return '#BBBBBB'; // Grey
    }
};

// Counter: Function that redraws the circle every second
function countDownCircle(document, id, timeDict) {
    // Get the canvas element that will be adjusted every second
    const canvas = document.getElementById(id);

    // Scale the canvas to fill the full height of the counter window
    const size = window.innerHeight;

    // Respect the device pixel ratio of High Resolution screens
    const dpr = window.devicePixelRatio || 1;

    // Adjust the size of the canvas respecting the device pixel ratio for high resolution screens
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    // Get the coordinates of the circle center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Sets the size of the windows with respect to the CSS
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';

    // Obtain the context that will be adjusted below
    const ctx = canvas.getContext('2d');

    // Clean the rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuration of placement of the text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Text size in [px]
    const fontSize = Math.round(size / 7);
    const font = `${fontSize}px Arial`;
    ctx.font = font

    // Time's up - Do not draw the circle, leave just the text.
    if (timeDict.counter === 0) {
        ctx.fillStyle = pickColorByPercentage(0);
        ctx.fillText(SPEAKER_MESSAGE.stop, centerX, centerY)

    // Running countdown - Draw the circle and the current timer.
    } else if (timeDict.counter > 0) {
        // The radius of the circle (inner or outer?) in the squared canvas, the range is (0, 0.5) * size of the square
        const radius = 0.4 * size;

        // Calculate how much time in percentage is remains in range <0, 1>
        const percentage = timeDict.counter / timeDict.duration;

        // Pick the color based on the percentage
        const color = pickColorByPercentage(percentage * 100);

        // Draw a new arc based on the percentage of remaining time
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + (2 * Math.PI * percentage), false);
        ctx.strokeStyle = color;
        ctx.lineWidth = canvas.width / 10; // The recommended range is <100 (very slim stroke), 5 (very bold))
        ctx.stroke();

        // Visualize current counter time
        ctx.fillStyle = pickColorByPercentage(percentage * 100);
        ctx.fillText(transform2TimeString(timeDict.counter), centerX, centerY)

        // Decrease counter by 1 seconds
        timeDict.counter -= 1;

    // Chill - Do not draw the circle, leave just the text.
    } else if (timeDict.counter === -1) {
        ctx.fillStyle = pickColorByPercentage(-1);
        ctx.fillText(SPEAKER_MESSAGE.chill, centerX, centerY)

    // Error state - leave just the text.
    } else {
        ctx.fillStyle = pickColorByPercentage(-1);
        ctx.fillText(`Err: [${timeDict.counter}].`, centerX, centerY);
    }
}



// Export functions
module.exports = {
    countDown,
    transform2Seconds,
    setSequence,
    countDownCircle,
}