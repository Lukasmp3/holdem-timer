import { BlindStructure } from "./blinds/blind-structure";

/**
 * Init and maintains one game session with defined blind structure.
 */
export class Session {

    private _blindStructure: BlindStructure;

	constructor($blindStructure: BlindStructure) {
		this._blindStructure = $blindStructure;
	}

    public get blindStructure(): BlindStructure {
        return this._blindStructure;
    }

}