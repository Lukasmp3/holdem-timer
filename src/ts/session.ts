import { BlindStructure } from "./blinds/blind-structure";

/**
 * Init and maintains one game session with defined blind structure.
 * 
 * Contains information about the total session time and remaining time to the next level.
 */
export class Session {

    private _blindStructure: BlindStructure;

    private _sessionTimeSeconds: number;

    private _remainingLevelDurationSeconds: number;

	constructor($blindStructure: BlindStructure) {
		this._blindStructure = $blindStructure;
        this._sessionTimeSeconds = 0;
        this._remainingLevelDurationSeconds = $blindStructure.levelDurationSeconds;
	}

    public get blindStructure(): BlindStructure {
        return this._blindStructure;
    }

    // TODO: not the best approach -> may not be necessarily precise
    public increaseSessionTimeBySecond(): void {
        this._sessionTimeSeconds++;
    }

    public decreaseRemainingLevelDurationBySeconds(): void {
        this._remainingLevelDurationSeconds--;
    }

    public resetRemainingLevelDuration(): void {
        this._remainingLevelDurationSeconds = this._blindStructure.levelDurationSeconds;
    }

    public static initDefalutSession(): Session {
        return new Session(new BlindStructure(BlindStructure.initDefaultBlindLevels()));
    }


    /**
     * Getter sessionTimeSeconds
     * @return {number}
     */
	public get sessionTimeSeconds(): number {
		return this._sessionTimeSeconds;
	}
    

    /**
     * Getter remainingLevelDurationSeconds
     * @return {number}
     */
	public get remainingLevelDurationSeconds(): number {
		return this._remainingLevelDurationSeconds;
	}


}