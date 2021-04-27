/**
 * Controlls all dynamic clocks on the 'screen-timer'
 */
export class Clock {

    _sessionStartTime: Date;

    constructor() {
        this._sessionStartTime = new Date();
    }

    private getSessionTime(): string {
        const currentTime = new Date();
        const sessionTime = new Date(currentTime.getTime() - this._sessionStartTime.getTime());
        // console.log(sessionTime);
        const hours = sessionTime.getHours() - 1;   // TODO: check output time
        // console.log(hours);
        const minutes = sessionTime.getMinutes();
        const seconds = sessionTime.getSeconds();
        return String(hours) + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    }

    updateSessionTime(): void {
        const timeSession = this.getSessionTime();
        const timeSessionEl = document.querySelector("#time-session-clock") as HTMLInputElement;
        // timeRealEl.innerText = timeReal;
        timeSessionEl.textContent = timeSession;
    }

    /**
     * Get the current time string and prepend zeros to minute value:
     * Exaple values:
     *   14:05
     *    5:45
     * @returns hour:minute string
     */
    private static getCurrentTime(): string {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        return String(hours).padStart(2) + ':' + String(minutes).padStart(2, '0');
    }

    /**
     * Update the real time for element #time-real
     */
    static updateRealTime(): void {
        const timeReal = Clock.getCurrentTime()
        const timeRealEl = document.querySelector("#time-real") as HTMLInputElement;
        // timeRealEl.innerText = timeReal;
        timeRealEl.textContent = timeReal;
    }



    /**
     * Repeatedly update all timers every second
     */
    static updateAllTimers(): void {
        Clock.updateRealTime();
        setInterval(() => Clock.updateRealTime(), 1000);
    }

}

const clockSession = new Clock();

// TODO: dummy implementation of session updating
setInterval(() => clockSession.updateSessionTime(), 1000);



