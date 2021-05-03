import { Session } from "./session";
import { SessionHandler } from "./session-handler";

export class Control {

	private sessionHandler: SessionHandler;

	constructor(sessionHandler: SessionHandler) {
		this.sessionHandler = sessionHandler;
		this.onClick('control-rewind', () => this.setPreviousLevel());
		this.onClick('control-forward', () => this.setNextLevel());
		this.onChange('screen-b', () => this.renderTimerScreen());
	}

	public isSessionPaused(): boolean {
		const pauseEl = document.querySelector("#input-control-pause") as HTMLInputElement;
		return (pauseEl.checked) ? true : false;
	}

	/**
	 * Increase level and re-render if changed
	 */
	 public setNextLevel(): void {
		// TODO: maybe move increasCurentLevel to Session
		if (this.getCurrentSession().blindStructure.increaseCurrentLevel()) {
			this.getCurrentSession().resetRemainingLevelDuration();
			this.renderBlindStructure();
		}
	}

	private getCurrentSession(): Session {return this.sessionHandler.session}

	
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
	 * Currently creates a new default session with no settings. 
	 */
	private initNewSession(): void {
		console.log('Init new session')
		this.sessionHandler.session = Session.initDefalutSession();
		(document.querySelector('#input-control-play') as HTMLInputElement).checked = false;
		(document.querySelector('#input-control-pause') as HTMLInputElement).checked = true;
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
	 * Decrease level and re-render
	 */
	private setPreviousLevel(): void {
		this.getCurrentSession().blindStructure.decreaseCurrentLevel();
		this.getCurrentSession().resetRemainingLevelDuration();
		this.renderBlindStructure();
	}

}
