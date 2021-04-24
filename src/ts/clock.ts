class Clock {

    /**
     * Get the current time string and prepend zeros to minute value:
     * Exaple values:
     *   14:05
     *    5:45
     * @returns hour:minute string
     */
    static getCurrentTimeString(): string {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        return String(hours).padStart(2) + ':' + String(minutes).padStart(2, '0');
    }

    /**
     * Update the real time for element #time-real
     */
    static updateTimeReal() {
        const timeReal = Clock.getCurrentTimeString()
        const timeRealEl = document.querySelector("#time-real") as HTMLInputElement;
        // timeRealEl.innerText = timeReal;
        timeRealEl.textContent = timeReal;
    }

    /**
     * Repeatidly update all timers every second
     */
    static updateAllTimers() {
        setInterval(() => Clock.updateTimeReal(), 1000);
    }

}

Clock.updateAllTimers();

// const timer = setInterval(() => Clock.updateTimeReal(), 1000);

