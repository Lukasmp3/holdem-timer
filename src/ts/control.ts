import { Session } from "./session";
import { SessionHandler } from "./session-handler";

export class Control {

	private sessionHandler: SessionHandler;

	constructor(sessionHandler: SessionHandler) {
		this.sessionHandler = sessionHandler;
		this.onClick('control-play', () => this.onClickPlay());
		this.onClick('control-pause', () => this.onClickPause());
		this.onClick('control-rewind', () => this.previousLevel());
		this.onClick('control-forward', () => this.nextLevel());
		this.onChange('screen-b', () => this.renderTimerScreen());
	}

	public isCurrentlyPaused(): boolean {
		console.log('todo')
		return false;
		// const control-
		// TODO: dodelat
	}

	private getCurrentSession(): Session {return this.sessionHandler.session}

	
	// private static onClick(id: string, cb: () => void) {
	private onClick(id: string, cb: () => void): void {
		const el = document.getElementById(id) as HTMLElement;
		el.addEventListener('click', cb);
	}

	private onChange(newId: string, cb: () => void): void {
		const el = document.getElementById(newId) as HTMLElement;
		el.addEventListener('change', cb);
	}

	private renderTimerScreen(): void {
		this.initNewSession();
		this.renderBlindStructure();
	}

	/**
	 * Currently only creates a new defautl session with no settings. 
	 */
	private initNewSession(): void {
		console.log('Init new session')
		this.sessionHandler.session = Session.initDefalutSession();
	}

	private renderBlindStructure(): void {
		const blindStructure = this.getCurrentSession().blindStructure;
		const currentLevel = blindStructure.currentLevel;
		const currentBlindLevelValues = blindStructure.blindLevels[currentLevel-1].values;
		const blindsValueText = currentBlindLevelValues.small.toString() + '\n' + currentBlindLevelValues.big.toString();
		this.renderBlindInformation('blinds-value', blindsValueText);
		this.renderBlindInformation('blinds-round', currentLevel.toString());
		this.renderBlindInformation('blinds-ante', currentBlindLevelValues.ante.toString());
	}

	private renderBlindInformation(id: string, value: string) {
		const blindsValueEl = document.getElementById(id) as HTMLElement;
		blindsValueEl.innerText = value;
	}

	/**
	 * Increase level and re-render if changed
	 */
	private nextLevel(): void {
		// TODO: mozna presunout increasCurentLevel do Session
		if (this.getCurrentSession().blindStructure.increaseCurrentLevel()) {
			this.getCurrentSession().resetRemainingLevelDuration();
			this.renderBlindStructure();
		}
	}

	/**
	 * Decrease level and re-render if changed
	 */
	private previousLevel(): void {
		if (this.getCurrentSession().blindStructure.decreaseCurrentLevel()) {
			this.getCurrentSession().resetRemainingLevelDuration();
			this.renderBlindStructure();
		}
	}

	private onClickPlay(): void {
		this.replaceControlPlayByPause();
		this.playNewRoundSound();
	}

	private onClickPause(): void {
		this.replaceControlPauseByPlay();
	}

	private replaceControlPlayByPause(): void {
		(document.getElementById('control-play') as HTMLElement).style.display = 'none';
		(document.getElementById('control-pause') as HTMLElement).style.display = 'inline';
	}

	private replaceControlPauseByPlay(): void {
		(document.getElementById('control-pause') as HTMLElement).style.display = 'none';
		(document.getElementById('control-play') as HTMLElement).style.display = 'inline';
	}

	private playNewRoundSound(): void {
		const audio = document.getElementById('sound-round-new') as HTMLAudioElement;
		audio.play();
	}


}
