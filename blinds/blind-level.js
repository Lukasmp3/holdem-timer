"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlindLevel = void 0;
/**
 * Representation of one blind level.
 */
class BlindLevel {
    /**
     * If not specified ante is 0.
     */
    constructor(level, values) {
        this._level = level;
        this._values = values;
    }
    get level() {
        return this._level;
    }
    get values() {
        return this._values;
    }
}
exports.BlindLevel = BlindLevel;
//# sourceMappingURL=blind-level.js.map