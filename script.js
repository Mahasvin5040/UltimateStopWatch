// script.js

let i = 0;
let z = 1;
let watches = [];

class StopWatch {
    constructor(disp, startstop, reset, hrs, mins, secs, add, rem, mult, multBtn, multDisp, num) {
        this.num = num;
        this.startTime;          // Stores the time when the stopwatch was started or resumed
        this.elapsedTime = 0;    // Stores the total time accumulated (in milliseconds)
        this.timerInterval;      // Stores the ID of the interval to control stopping/starting
        this.isRunning = false;  // Flag to track the stopwatch state
        this.rawHours;
        this.rawMins;
        this.rawSecs;
        this.storedQuantity = 0;
        this.currentElapsed = 0;

        this.multiplier = 1;
        this.multBtn = document.getElementById(multBtn);
        this.multDisplay = document.getElementById(multDisp);

        this.display = document.getElementById(disp); //
        this.startStopBtn = document.getElementById(startstop); // 
        this.resetBtn = document.getElementById(reset); //
        this.removeButton = document.getElementById(rem);

        this.changeMult = document.getElementById(mult);
        this.changeHours = document.getElementById(hrs);
        this.changeMinutes = document.getElementById(mins);
        this.changeSeconds = document.getElementById(secs);
        this.addBtn = document.getElementById(add); //

        this.addBtn.addEventListener('click', this.addTime);
        this.startStopBtn.addEventListener('click', this.startStopwatch);
        this.resetBtn.addEventListener('click', this.resetStopwatch);
        this.removeButton.addEventListener('click', this.remove);
        this.multBtn.addEventListener('click', this.multChange);


    // --- Helper Functions ---
    }
    addTime = () => {
        this.rawHours = this.changeHours.value;
        this.rawMins = this.changeMinutes.value;
        this.rawSecs = this.changeSeconds.value;
        let quantity = 0;
        // Check if the input is not empty and convert it
        if (this.rawHours) {
            quantity += (parseInt(this.rawHours, 10)) * 60 * 60 * 1000; 
            this.changeHours.value = "";    
        }
        if (this.rawMins) {
            quantity += (parseInt(this.rawMins, 10)) * 60 * 1000; 
            this.changeMinutes.value = "";    
        }
        if (this.rawSecs) {
            quantity += (parseInt(this.rawSecs, 10)) * 1000; 
            this.changeSeconds.value = "";    
        }
        this.storedQuantity += quantity;
        this.currentElapsed += quantity;
        this.display.textContent = this.formatTime(this.currentElapsed);

    };

    multChange = () => {
        if (!this.isRunning) {
            this.multiplier = this.changeMult.value;
            this.multDisplay.textContent = "Multiplier: " + this.changeMult.value;
        }
    }
    // Function to format the time into MM:SS:msms
    formatTime = (ms) => {
        const totalMilliseconds = ms;

        // Calculate components:
        // Milliseconds: The remainder after dividing by 1000 (modulus 1000)
        let milliseconds = Math.floor((totalMilliseconds % 1000) / 10); // Displaying only two digits (tenths of a second)
        //let milliseconds = totalMilliseconds % 1000;
        // Seconds: Total ms divided by 1000, then mod 60
        let seconds = Math.floor((totalMilliseconds / 1000) % 60);

        // Minutes: Total ms divided by 1000, divided by 60
        let minutes = Math.floor(totalMilliseconds / (1000 * 60) % 60);

        let hours = Math.floor(totalMilliseconds / (1000 * 60 * 60) % 24);

        let days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));


        // Pad with leading zeros (e.g., 5 -> "05")
        days = String(days).padStart(2, '0')
        hours = String(hours).padStart(2, '0')
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');

        return `${days}|${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    // Function to update the display
    printTime = () => {
        // Current total elapsed time = (current time - this.startTime) + accumulated this.elapsedTime
        const now = Date.now();
        this.currentElapsed = (now - this.startTime) * this.multiplier + this.elapsedTime + this.storedQuantity;

        this.display.textContent = this.formatTime(this.currentElapsed);

    }

    // --- Control Functions ---

    startStopwatch = () => {
        if (!this.isRunning) {
            // Record the time when the start button was pressed
            this.startTime = Date.now();

            // Start the continuous update
            // The interval is set to 10 milliseconds for a smooth update
            this.timerInterval = setInterval(this.printTime, 10);

            this.isRunning = true;
            this.startStopBtn.textContent = 'Stop';
            this.startStopBtn.style.backgroundColor = '#ff3c00ff'; // Orange
        } else {
            // Stop the continuous update
            clearInterval(this.timerInterval);

            // Update the total elapsed time before stopping
            this.elapsedTime += (Date.now() - this.startTime) * this.multiplier;

            this.isRunning = false;
            this.startStopBtn.textContent = 'Start';
            this.startStopBtn.style.backgroundColor = '#4CAF50'; // Green
        }
    }

    resetStopwatch = () => {
        // Stop the interval if it's running
        clearInterval(this.timerInterval);

        // Reset all variables
        this.elapsedTime = 0;
        this.storedQuantity = 0;
        this.isRunning = false;
        this.currentElapsed = 0;

        // Reset display and button text/color
        this.display.textContent = '00|00:00:00.00';
        this.startStopBtn.textContent = 'Start';
        this.startStopBtn.style.backgroundColor = '#4CAF50'; // Green
    }
    remove = () => {
        watches[this.num] = undefined;
        let removeSw = document.getElementById('sw' + this.num.toString());
        removeSw.remove();
        z-=1;

        let swAreaVar = document.getElementById('swSection');
        height = (z * 25).toString();
        swAreaVar.style.height = height.toString() + 'vh';

        let totalDisp = document.getElementById('total');
        totalDisp.textContent = 'Total Stopwatches: ' + (z-1).toString();
        console.log(watches);
    }
    
}


//let watch0 = new StopWatch('display', 'startStopBtn', 'resetBtn', 'hourInput', 'minuteInput', 'secondInput', 'addBtn');
//watches[0] = watch0;
//watch0.resetStopwatch();

function newWatch() {
    let swAreaVar = document.getElementById('swSection');
    height = (150 + (z * 230)).toString();
    swAreaVar.style.height = height.toString() + 'px';

    let newSw = document.createElement('div');
    newSw.className = 'stopwatch';
    newSw.id = 'sw' + i.toString();
    swAreaVar.appendChild(newSw);

    let newGuidance = document.createElement('p');
    newGuidance.className = 'guidance'
    newGuidance.textContent = '---- days --- | --- hours --- | --- mins --- | --- secs --- | --- ms ---';
    newSw.appendChild(newGuidance);

    let overallDisp = document.createElement('div');
    overallDisp.className = 'overall';
    newSw.appendChild(overallDisp);

    let newDisp = document.createElement('div');
    newDisp.className = 'disp';
    newDisp.id = 'display' + i.toString();
    newDisp.textContent = '00|00:00:00.00'
    overallDisp.appendChild(newDisp);

    let newRemoveBtn = document.createElement('button');
    newRemoveBtn.className = 'veryDangerous';
    newRemoveBtn.id = 'removeBtn' + i.toString();
    newRemoveBtn.textContent = 'Remove';
    overallDisp.appendChild(newRemoveBtn);
    
    let newCounter = document.createElement('p');
    newCounter.className = 'counter';
    newCounter.id = 'count' + i.toString();
    newCounter.textContent = '#' + (i + 1).toString();
    overallDisp.appendChild(newCounter);
    
    let newControls = document.createElement('div');
    newControls.className = 'controls';
    newControls.id = 'buttons' + i.toString();
    newSw.appendChild(newControls);

    let newStartBtn = document.createElement('button');
    newStartBtn.className = 'safe';
    newStartBtn.id = 'startStopBtn' + i.toString();
    newStartBtn.textContent = 'Start';
    newControls.appendChild(newStartBtn);

    let newAddBtn = document.createElement('button');
    newAddBtn.className = 'height';
    newAddBtn.id = 'addBtn' + i.toString();
    newAddBtn.textContent = 'Add';
    newControls.appendChild(newAddBtn);

    let newHrInput = document.createElement('input');
    newHrInput.setAttribute('type', 'number');
    newHrInput.setAttribute('name', 'quantity');
    newHrInput.setAttribute('step', '1');
    newHrInput.setAttribute('placeholder', 'HH');
    newHrInput.id = 'hourInput' + i.toString();
    newControls.appendChild(newHrInput);

    let newMinInput = document.createElement('input');
    newMinInput.setAttribute('type', 'number');
    newMinInput.setAttribute('name', 'quantity');
    newMinInput.setAttribute('step', '1');
    newMinInput.setAttribute('placeholder', 'MM');
    newMinInput.id = 'minuteInput' + i.toString();
    newControls.appendChild(newMinInput);

    let newSecInput = document.createElement('input');
    newSecInput.setAttribute('type', 'number');
    newSecInput.setAttribute('name', 'quantity');
    newSecInput.setAttribute('step', '1');
    newSecInput.setAttribute('placeholder', 'SS');
    newSecInput.id = 'secondInput' + i.toString();
    newControls.appendChild(newSecInput);

    let newResBtn = document.createElement('button');
    newResBtn.className = 'dangerous';
    newResBtn.id = 'resetBtn' + i.toString();
    newResBtn.textContent = 'Reset';
    newControls.appendChild(newResBtn);

    let newMultControls = document.createElement('div');
    newMultControls.className = 'overall';
    newMultControls.id = 'multButtons' + i.toString();
    newSw.appendChild(newMultControls);

    let newMultInput = document.createElement('input');
    newMultInput.setAttribute('type', 'number');
    newMultInput.setAttribute('name', 'quantity');
    newMultInput.setAttribute('step', '.1');
    newMultInput.setAttribute('placeholder', '1.0');
    newMultInput.id = 'multInput' + i.toString();
    newMultControls.appendChild(newMultInput);

    let newMultBtn = document.createElement('button');
    newMultBtn.className = 'dangerous';
    newMultBtn.id = 'multBtn' + i.toString();
    newMultBtn.textContent = 'Multiply';
    newMultControls.appendChild(newMultBtn);

    let newMultDisp = document.createElement('div');
    newMultDisp.className = 'multDisp';
    newMultDisp.id = 'multDisplay' + i.toString();
    newMultDisp.textContent = 'Multiplier: 1.00'
    newMultControls.appendChild(newMultDisp);



    watches[i] = new StopWatch(newDisp.id, newStartBtn.id, newResBtn.id, newHrInput.id, newMinInput.id, newSecInput.id, newAddBtn.id, newRemoveBtn.id, newMultInput.id, newMultBtn.id, newMultDisp.id, i);

    i = i + 1;
    z = z + 1;

    let totalDisp = document.getElementById('total');
    totalDisp.textContent = 'Total Stopwatches: ' + (z-1).toString();
    console.log(watches);
}
let addSwButton = document.getElementById('addSwButton');
addSwButton.addEventListener('click', newWatch);


let startAllButton = document.getElementById('stopAllButton');
let resetAllButton = document.getElementById('resAllButton');
let addAllButton = document.getElementById('allAddButton');

function startAll() {
    let j;
    for (j = 0; j < watches.length; j++) {
        if (watches[j] != undefined) {
            watches[j].startStopwatch();
        }
    }
}

function resetAll() {
    let k;
    for (k = 0; k < watches.length; k++) {
        if (watches[k] != undefined) {
            watches[k].resetStopwatch();
        }
    }
}

function addAll() {
    let m;
    let allHrsTime = document.getElementById('allHrInput');
    let allMinsTime = document.getElementById('allMinInput');
    let allSecsTime = document.getElementById('allSecInput');

    for (m = 0; m < watches.length; m++) {
        if (watches[m] != undefined) {
            watches[m].changeHours.value = allHrsTime.value;
            watches[m].changeMinutes.value = allMinsTime.value;
            watches[m].changeSeconds.value = allSecsTime.value;
            watches[m].addTime();
        }
    }
    allHrsTime.value = "";
    allMinsTime.value = "";
    allSecsTime.value = "";
}

startAllButton.addEventListener('click', startAll);
resetAllButton.addEventListener('click', resetAll);
addAllButton.addEventListener('click', addAll);

newWatch();
