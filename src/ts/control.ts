import { Session } from "./session";
import { SessionHandler } from "./session-handler";

export class Control {

	private sessionHandler: SessionHandler;

	constructor(sessionHandler: SessionHandler) {
		this.sessionHandler = sessionHandler;
		this.onClick('control-rewind', () => this.setPreviousLevel());
		this.onClick('control-forward', () => this.setNextLevel());
		this.onChange('screen-a', () => this.initDefaultSession());
		this.onChange('screen-b', () => this.runNewSession());
	}

	public isSessionPaused(): boolean {
		const pauseEl = document.querySelector("#input-control-pause") as HTMLInputElement;
		return (pauseEl.checked) ? true : false;
	}

	/**
	 * Increase level and re-render if changed
	 */
	 public setNextLevel(): void {
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

	private initDefaultSession(): void {
		console.log('Init default session');
		this.sessionHandler.session = Session.initDefaultSession();
	}

	private runNewSession(): void {
		this.setBlindsStucture();
		this.renderNewSession();
		this.renderBlindStructure();
	}

	private setBlindsStucture(): void {
		const anteIsEnabled = (document.getElementById("ante-toggle") as HTMLInputElement).checked;
		if (anteIsEnabled) {
			this.sessionHandler.session = Session.initDefaultSessionWithAnte();
		}
		else {
			this.sessionHandler.session = Session.initDefaultSession();
		}

		const levelDuration = (document.getElementById("duration-option") as HTMLInputElement).value;
		console.log('Create a new blind structure with level duration=' + levelDuration);
		this.getCurrentSession().blindStructure.levelDurationSeconds = 60 * Number(levelDuration);

		
		this.getCurrentSession().resetRemainingLevelDuration();
	}

	/**
	 * Creates a new configured session 
	 */
	private renderNewSession(): void {
		console.log('Start the session');
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
