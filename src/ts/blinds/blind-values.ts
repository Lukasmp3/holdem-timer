/**
 * Values of one blind level.
 */
export class BlindValues {

    private _small: number;
    private _big: number;
    private _ante: number;

    /**
     * If not specified ante is 0. 
     */
    constructor(small: number, big: number, ante: number = 0) {
        this._small = small;
        this._big = big;
        this._ante = ante;
	}

    public get small(): number {
        return this._small;
    }

    public get big(): number {
        return this._big;
    }

    public get ante(): number {
        return this._ante;
    }

    
}