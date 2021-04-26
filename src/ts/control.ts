import { SessionHandler } from "./session-handler";

export class Control {

	static init() {
		Control.onClick('control-play', () => this.onClickPlay());
		Control.onClick('control-pause', () => this.onClickPause());
		Control.onClick('control-rewind', () => this.onClickRewind());
		Control.onClick('control-forward', () => console.log('TODO - forward click'));
	}
	
	private static onClick(id: string, cb: () => void) {
		const el = document.getElementById(id) as HTMLElement;
		el.addEventListener('click', cb);
	}

	private static onClickPlay() {
		this.replaceControlPlayByPause();
		this.playNewRoundSound();
	}

	private static onClickPause() {
		this.replaceControlPauseByPlay();
	}

	private static onClickRewind() {
		console.log('TODO - rewind click');
		const blindStructure = SessionHandler.getSession().blindStructure;
		const blindsValueEl = document.getElementById('blinds-value') as HTMLElement;
		const currentBlindLevelValues = blindStructure.blindLevels[blindStructure.currentLevel].values;
		const blindsValueText = currentBlindLevelValues.small.toString() + '\n' + currentBlindLevelValues.big.toString();
		blindsValueEl.innerText = blindsValueText;
	}

	private static replaceControlPlayByPause() {
		(document.getElementById('control-play') as HTMLElement).style.display = 'none';
		(document.getElementById('control-pause') as HTMLElement).style.display = 'inline';
	}

	private static replaceControlPauseByPlay() {
		(document.getElementById('control-pause') as HTMLElement).style.display = 'none';
		(document.getElementById('control-play') as HTMLElement).style.display = 'inline';
	}

	private static playNewRoundSound() {
		const audio = document.getElementById('sound-round-new') as HTMLAudioElement;
		audio.play();
	}


}
