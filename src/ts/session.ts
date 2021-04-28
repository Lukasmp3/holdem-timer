import { BlindStructure } from "./blinds/blind-structure";

/**
 * Init and maintains one game session with defined blind structure.
 * 
 * Contains information about the total session time and remaining time to the next level.
 */
export class Session {

    private _blindStructure: BlindStructure;

    private _sessionDurationMs: number;

    private _remainingLevelDurationMs: number;

	constructor($blindStructure: BlindStructure) {
		this._blindStructure = $blindStructure;
        this._sessionDurationMs = 0;
        this._remainingLevelDurationMs = $blindStructure.levelDurationSeconds * 1000;
	}

    public get blindStructure(): BlindStructure {
        return this._blindStructure;
    }

    public increaseSessionDuration(durationMs: number): void {
        this._sessionDurationMs += durationMs;
    }

    public decreaseRemainingLevelDuration(durationMs: number): void {
        this._remainingLevelDurationMs -= durationMs;
    }

    public resetRemainingLevelDuration(): void {
        this._remainingLevelDurationMs = this._blindStructure.levelDurationSeconds * 1000;
    }

    public static initDefalutSession(): Session {
        return new Session(new BlindStructure(BlindStructure.initDefaultBlindLevels()));
    }


    /**
     * Getter sessionTimeSeconds
     * @return {number}
     */
	public get sessionDurationMs(): number {
		return this._sessionDurationMs;
	}
    

    /**
     * Getter remainingLevelDurationSeconds
     * @return {number}
     */
	public get remainingLevelDurationMs(): number {
		return this._remainingLevelDurationMs;
	}


}