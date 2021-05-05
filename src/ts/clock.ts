import { SessionHandler } from "./session-handler";
import { Session } from "./session";
import { Control } from "./control";

/**
 * Controlls all dynamic clocks on the 'screen-timer'
 */
export class Clock {

    private static UPDATE_INTERVAL_MS: number = 1000;

    private _sessionHandler: SessionHandler;

    private _control: Control;

    constructor(sessionHandler: SessionHandler, control: Control) {
        this._sessionHandler = sessionHandler;
        this._control = control;
        this.init();
    }

    private getCurrentSession(): Session { return this._sessionHandler.session }

    /**
     * Update all timers and periodically repeat
     */
    private init(): void {

        let previousTime = Date.now();
        let currentTime: number;
        this.updateAllTimers(0);

        setInterval(() => {
            currentTime = Date.now();
            const elapsedTime = currentTime - previousTime;
            this.updateAllTimers(elapsedTime);
            previousTime = currentTime;
        },
            Clock.UPDATE_INTERVAL_MS
        );

    }

    /**
     * The main function responsible for updating and rendering of blinds and timers.
     * If the current level has reached the end, increase the level and playu sound.
     * If the session is paused, don't update the timers.
     * 
     * @param realElapsedTimeMs elapsed times from last iteration 
     */
    private updateAllTimers(realElapsedTimeMs: number): void {
        if (this.getCurrentSession().remainingLevelDurationMs <= 0) {
            this._control.setNextLevel();
            this.playNewRoundSound();
        }

        if (!this._control.isSessionPaused()) {
            // If the session just started, play the new round sound
            if (!this.getCurrentSession().hasStarted) this.playNewRoundSound(); 
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
    private updateSessionDurations(realElapsedTimeMs: number): void {
        const session = this.getCurrentSession();
        session.increaseSessionDuration(realElapsedTimeMs);
        session.decreaseRemainingLevelDuration(realElapsedTimeMs);
    }

    private renderSessionTimer(): void {
        const sessionTimeMs = this.getCurrentSession().sessionDurationMs;
        const sessionTime = Clock.millisToMinutesAndSeconds(sessionTimeMs);

        const timeSessionEl = document.querySelector("#time-session-clock") as HTMLInputElement;
        timeSessionEl.textContent = sessionTime;
    }

    private renderRoundTimer(): void {
        const roundTimeMs = this.getCurrentSession().remainingLevelDurationMs;
        const roundTime = Clock.millisToMinutesAndSeconds(roundTimeMs);
        // console.log('Round time=' + roundTime)
        const timerRoundEl = document.querySelector('#time-round') as HTMLInputElement;
        timerRoundEl.textContent = roundTime;
    }

    /**
     * Update the real time for element #time-real
     */
    private renderRealTimer(): void {
        const timeReal = Clock.getCurrentTime()
        const timeRealEl = document.querySelector("#time-real") as HTMLInputElement;
        // timeRealEl.innerText = timeReal;
        timeRealEl.textContent = timeReal;
    }

    /**
     * Play the sound if the application isn't muted 
     */
    private playNewRoundSound(): void {
        const isMuted = !(document.getElementById('sound-toggle') as HTMLInputElement).checked;
        if (isMuted) {
            return;
        } else {
            const audio = document.getElementById('sound-round-new') as HTMLAudioElement;
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
    private static getCurrentTime(): string {
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
    private static millisToMinutesAndSeconds(millis: number): string {
        const minutes = Math.floor(millis / 60000);
        const seconds = Number(((millis % 60000) / 1000).toFixed(0));
        return (
            seconds == 60 ?
                (minutes + 1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }
}
