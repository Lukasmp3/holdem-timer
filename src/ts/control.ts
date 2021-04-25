export class Control {
	
	static init() {
		Control.onClick('control-play', () => this.onClickPlay());
		Control.onClick('control-pause', () => this.onClickPause());
		Control.onClick('control-rewind', () => console.log('TODO - rewind click'));
		Control.onClick('control-forward', () => console.log('TODO - forward click'));
	}
	
	private static onClick(id: string, cb: () => void) {
		const el: HTMLElement = document.getElementById(id) as HTMLElement;
		el.addEventListener('click', cb);
	}

	private static onClickPlay() {
		this.replaceControlPlayByPause();
		this.playNewRoundSound();
	}

	private static onClickPause() {
		this.replaceControlPauseByPlay();
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
