class Stopwatch {
    constructor() {
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.millisecondsElement = document.getElementById('milliseconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.clearLapsBtn = document.getElementById('clearLapsBtn');
        this.lapsList = document.getElementById('lapsList');

        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.interval = null;
        this.isRunning = false;
        this.lapNumber = 0;
        this.lastLapTime = 0;

        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.addLap());
        this.clearLapsBtn.addEventListener('click', () => this.clearLaps());
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(() => this.updateTime(), 10);
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.interval);
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
        }
    }

    reset() {
        this.pause();
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.lapNumber = 0;
        this.lastLapTime = 0;
        this.updateDisplay();
        this.clearLaps();
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
    }

    updateTime() {
        this.milliseconds++;
        if (this.milliseconds === 100) {
            this.milliseconds = 0;
            this.seconds++;
            if (this.seconds === 60) {
                this.seconds = 0;
                this.minutes++;
            }
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.minutesElement.textContent = this.padNumber(this.minutes);
        this.secondsElement.textContent = this.padNumber(this.seconds);
        this.millisecondsElement.textContent = this.padNumber(this.milliseconds);
    }

    padNumber(number) {
        return number.toString().padStart(2, '0');
    }

    addLap() {
        this.lapNumber++;
        const totalMilliseconds = (this.minutes * 60 * 1000) + (this.seconds * 1000) + (this.milliseconds * 10);
        const currentLapMilliseconds = totalMilliseconds - this.lastLapTime;
        this.lastLapTime = totalMilliseconds;

        const lapMinutes = Math.floor(currentLapMilliseconds / (60 * 1000));
        const lapSeconds = Math.floor((currentLapMilliseconds % (60 * 1000)) / 1000);
        const lapMilliseconds = Math.floor((currentLapMilliseconds % 1000) / 10);

        const lapTimeFormatted = 
            this.padNumber(lapMinutes) + ':' + 
            this.padNumber(lapSeconds) + ':' + 
            this.padNumber(lapMilliseconds);

        const totalTimeFormatted = 
            this.padNumber(this.minutes) + ':' +
            this.padNumber(this.seconds) + ':' +
            this.padNumber(this.milliseconds);

        const row = this.lapsList.insertRow(0); // Insert at the top
        const lapCell = row.insertCell(0);
        const totalTimeCell = row.insertCell(1);
        const lapTimeCell = row.insertCell(2);

        lapCell.textContent = `#${this.lapNumber}`;
        totalTimeCell.textContent = totalTimeFormatted;
        lapTimeCell.textContent = lapTimeFormatted;
    }

    clearLaps() {
        this.lapsList.innerHTML = '';
    }
}

// Initialize the stopwatch
const stopwatch = new Stopwatch(); 