"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlindValues = void 0;
class BlindValues {
    /**
     * If not specified ante is 0.
     */
    constructor(small, big, ante = 0) {
        this._small = small;
        this._big = big;
        this._ante = ante;
    }
    get small() {
        return this._small;
    }
    get big() {
        return this._big;
    }
    get ante() {
        return this._ante;
    }
}
exports.BlindValues = BlindValues;
//# sourceMappingURL=blind-values.js.map