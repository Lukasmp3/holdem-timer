"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlindStructure = void 0;
const blind_level_1 = require("./blind-level");
const blind_values_1 = require("./blind-values");
/**
 * The entire blind structure for configured session.
 */
class BlindStructure {
    constructor(blindLevels, levelDurationSeconds = 600) {
        this._blindLevels = blindLevels;
        this._currentLevel = 1;
        this._levelDurationSeconds = levelDurationSeconds;
    }
    /**
     *
     * @returns true if the level was increased
     */
    increaseCurrentLevel() {
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
    decreaseCurrentLevel() {
        if (this.currentLevel > 1) {
            this._currentLevel--;
            return true;
        }
        return false;
    }
    static initDefaultBlindLevelsWithoutAnte() {
        return [
            new blind_level_1.BlindLevel(1, new blind_values_1.BlindValues(25, 50)),
            new blind_level_1.BlindLevel(2, new blind_values_1.BlindValues(50, 100)),
            new blind_level_1.BlindLevel(3, new blind_values_1.BlindValues(75, 150)),
            new blind_level_1.BlindLevel(4, new blind_values_1.BlindValues(100, 200)),
            new blind_level_1.BlindLevel(5, new blind_values_1.BlindValues(150, 300)),
            new blind_level_1.BlindLevel(6, new blind_values_1.BlindValues(250, 500)),
            new blind_level_1.BlindLevel(7, new blind_values_1.BlindValues(350, 700)),
            new blind_level_1.BlindLevel(8, new blind_values_1.BlindValues(500, 1000)),
            new blind_level_1.BlindLevel(9, new blind_values_1.BlindValues(750, 1500)),
            new blind_level_1.BlindLevel(10, new blind_values_1.BlindValues(1000, 2000)),
            new blind_level_1.BlindLevel(11, new blind_values_1.BlindValues(1500, 3000)),
            new blind_level_1.BlindLevel(12, new blind_values_1.BlindValues(2000, 4000)),
        ];
    }
    static initDefaultBlindLevelsWithAnte() {
        return [
            new blind_level_1.BlindLevel(1, new blind_values_1.BlindValues(25, 50, 5)),
            new blind_level_1.BlindLevel(2, new blind_values_1.BlindValues(50, 100, 5)),
            new blind_level_1.BlindLevel(3, new blind_values_1.BlindValues(75, 150, 10)),
            new blind_level_1.BlindLevel(4, new blind_values_1.BlindValues(100, 200, 10)),
            new blind_level_1.BlindLevel(5, new blind_values_1.BlindValues(150, 300, 25)),
            new blind_level_1.BlindLevel(6, new blind_values_1.BlindValues(250, 500, 50)),
            new blind_level_1.BlindLevel(7, new blind_values_1.BlindValues(350, 700, 75)),
            new blind_level_1.BlindLevel(8, new blind_values_1.BlindValues(500, 1000, 100)),
            new blind_level_1.BlindLevel(9, new blind_values_1.BlindValues(750, 1500, 150)),
            new blind_level_1.BlindLevel(10, new blind_values_1.BlindValues(1000, 2000, 200)),
            new blind_level_1.BlindLevel(11, new blind_values_1.BlindValues(1500, 3000, 250)),
            new blind_level_1.BlindLevel(12, new blind_values_1.BlindValues(2000, 4000, 300)),
        ];
    }
    get blindLevels() {
        return this._blindLevels;
    }
    get currentLevel() {
        return this._currentLevel;
    }
    get levelDurationSeconds() {
        return this._levelDurationSeconds;
    }
    set levelDurationSeconds(durationS) {
        this._levelDurationSeconds = durationS;
    }
}
exports.BlindStructure = BlindStructure;
//# sourceMappingURL=blind-structure.js.map