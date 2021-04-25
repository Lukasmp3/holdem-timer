import {BlindValues} from './blind-values';

export class BlindLevel {

    private _level: number;
    private _values: BlindValues;

    /**
     * If not specified ante is 0. 
     */
    constructor(level: number, values: BlindValues) {
        this._level = level;
        this._values = values;
	}

    public get level(): number {
        return this._level;
    }

    public get values(): BlindValues {
        return this._values;
    }
    
}