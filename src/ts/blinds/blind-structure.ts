import {BlindLevel} from './blind-level';
import {BlindValues} from './blind-values';

export class BlindStructure {

    private _blindLevels: BlindLevel[];
    
    private _currentLevel: number;

    private _levelDurationSeconds: number;
    
    constructor(blindLevels: BlindLevel[], levelDurationSeconds: number = 600) {
        this._blindLevels = blindLevels;
        this._currentLevel = 1;
        this._levelDurationSeconds = levelDurationSeconds;
	}

    /**
     * 
     * @returns true if the level was increased
     */
    public increaseCurrentLevel(): boolean {
        if (this.currentLevel < this._blindLevels.length) {
            this._currentLevel++;
            return true;
        }
        return false;
    }

    /**
     * 
     * @returns true if the level was decreased
     */
    public decreaseCurrentLevel(): boolean {
        if (this.currentLevel > 1) {
            this._currentLevel--;
            return true;
        }
        return false;
    }

    public static initDefaultBlindLevelsWithoutAnte(): BlindLevel[] {
        return [
            new BlindLevel(1, new BlindValues(25, 50)), 
            new BlindLevel(2, new BlindValues(50, 100)), 
            new BlindLevel(3, new BlindValues(75, 150)), 
            new BlindLevel(4, new BlindValues(100, 200)), 
            new BlindLevel(5, new BlindValues(150, 300)), 
            new BlindLevel(6, new BlindValues(250, 500)), 
            new BlindLevel(7, new BlindValues(350, 700)), 
            new BlindLevel(8, new BlindValues(500, 1000)), 
            new BlindLevel(9, new BlindValues(750, 1500)), 
            new BlindLevel(10, new BlindValues(1000, 2000)), 
            new BlindLevel(11, new BlindValues(1500, 3000)), 
            new BlindLevel(12, new BlindValues(2000, 4000)), 
        ]
    }

    public static initDefaultBlindLevelsWithAnte(): BlindLevel[] {
        return [
            new BlindLevel(1, new BlindValues(25, 50, 5)), 
            new BlindLevel(2, new BlindValues(50, 100, 5)), 
            new BlindLevel(3, new BlindValues(75, 150, 10)), 
            new BlindLevel(4, new BlindValues(100, 200, 10)), 
            new BlindLevel(5, new BlindValues(150, 300, 25)), 
            new BlindLevel(6, new BlindValues(250, 500, 50)), 
            new BlindLevel(7, new BlindValues(350, 700, 75)), 
            new BlindLevel(8, new BlindValues(500, 1000, 100)), 
            new BlindLevel(9, new BlindValues(750, 1500, 150)), 
            new BlindLevel(10, new BlindValues(1000, 2000, 200)), 
            new BlindLevel(11, new BlindValues(1500, 3000, 250)), 
            new BlindLevel(12, new BlindValues(2000, 4000, 300)), 
        ]
    }

    public get blindLevels(): BlindLevel[] {
        return this._blindLevels;
    }

    public get currentLevel(): number {
        return this._currentLevel;
    }

    public get levelDurationSeconds(): number {
        return this._levelDurationSeconds;
    }

    public set levelDurationSeconds(durationS: number) {
        this._levelDurationSeconds = durationS;
    }
}