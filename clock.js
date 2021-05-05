"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
/**
 * Controlls all dynamic clocks on the 'screen-timer'
 */
class Clock {
    constructor(sessionHandler, control) {
        this._sessionHandler = sessionHandler;
        this._control = control;
        this.init();
    }
    getCurrentSession() { return this._sessionHandler.session; }
    /**
     * Update all timers and periodically repeat
     */
    init() {
        let previousTime = Date.now();
        let currentTime;
        this.updateAllTimers(0);
        setInterval(() => {
            currentTime = Date.now();
            const elapsedTime = currentTime - previousTime;
            this.updateAllTimers(elapsedTime);
            previousTime = currentTime;
        }, Clock.UPDATE_INTERVAL_MS);
    }
    /**
     * The main function responsible for updating and rendering of blinds and timers.
     * If the current level has reached the end, increase the level and playu sound.
     * If the session is paused, don't update the timers.
     *
     * @param realElapsedTimeMs elapsed times from last iteration
     */
    updateAllTimers(realElapsedTimeMs) {
        if (this.getCurrentSession().remainingLevelDurationMs <= 0) {
            this._control.setNextLevel();
            this.playNewRoundSound();
        }
        if (!this._control.isSessionPaused()) {
            // If the session just started, play the new round sound
            if (!this.getCurrentSession().hasStarted)
                this.playNewRoundSound();
            this.getCurrentSession().hasAlreadyStarted();
            this.updateSessionDurations(realElapsedTimeMs);
        }
        this.renderRealTimer();
        this.renderSessionTimer();
        this.renderRoundTimer();
    }
    /**
     * Update session duration and remaining level duration
     */
    updateSessionDurations(realElapsedTimeMs) {
        const session = this.getCurrentSession();
        session.increaseSessionDuration(realElapsedTimeMs);
        session.decreaseRemainingLevelDuration(realElapsedTimeMs);
    }
    renderSessionTimer() {
        const sessionTimeMs = this.getCurrentSession().sessionDurationMs;
        const sessionTime = Clock.millisToMinutesAndSeconds(sessionTimeMs);
        const timeSessionEl = document.querySelector("#time-session-clock");
        timeSessionEl.textContent = sessionTime;
    }
    renderRoundTimer() {
        const roundTimeMs = this.getCurrentSession().remainingLevelDurationMs;
        const roundTime = Clock.millisToMinutesAndSeconds(roundTimeMs);
        // console.log('Round time=' + roundTime)
        const timerRoundEl = document.querySelector('#time-round');
        timerRoundEl.textContent = roundTime;
    }
    /**
     * Update the real time for element #time-real
     */
    renderRealTimer() {
        const timeReal = Clock.getCurrentTime();
        const timeRealEl = document.querySelector("#time-real");
        // timeRealEl.innerText = timeReal;
        timeRealEl.textContent = timeReal;
    }
    /**
     * Play the sound if the application isn't muted
     */
    playNewRoundSound() {
        const isMuted = !document.getElementById('sound-toggle').checked;
        if (isMuted) {
            return;
        }
        else {
            const audio = document.getElementById('sound-round-new');
            audio.play();
        }
    }
    /**
     * Get the current time string and prepend zeros to minute value:
     * Exaple values:
     *   14:05
     *    5:45
     * @returns hour:minute string
     */
    static getCurrentTime() {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        return String(hours).padStart(2) + ':' + String(minutes).padStart(2, '0');
    }
    /**
     * TODO: support for hours
     * Source:
     *   https://stackoverflow.com/a/21294619/13134499
     */
    static millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = Number(((millis % 60000) / 1000).toFixed(0));
        return (seconds == 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }
}
exports.Clock = Clock;
Clock.UPDATE_INTERVAL_MS = 1000;
//# sourceMappingURL=clock.js.map