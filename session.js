"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const blind_structure_1 = require("./blinds/blind-structure");
/**
 * Init and maintains one game session with defined blind structure.
 *
 * Contains information about the total session time and remaining time to the next level.
 */
class Session {
    constructor($blindStructure) {
        this._hasStarted = false;
        this._blindStructure = $blindStructure;
        this._sessionDurationMs = 0;
        this._remainingLevelDurationMs = $blindStructure.levelDurationSeconds * 1000;
    }
    get blindStructure() {
        return this._blindStructure;
    }
    get hasStarted() {
        return this._hasStarted;
    }
    increaseSessionDuration(durationMs) {
        this._sessionDurationMs += durationMs;
    }
    decreaseRemainingLevelDuration(durationMs) {
        this._remainingLevelDurationMs -= durationMs;
    }
    resetRemainingLevelDuration() {
        this._remainingLevelDurationMs = this._blindStructure.levelDurationSeconds * 1000;
    }
    static initDefaultSession() {
        return new Session(new blind_structure_1.BlindStructure(blind_structure_1.BlindStructure.initDefaultBlindLevelsWithoutAnte()));
    }
    static initDefaultSessionWithAnte() {
        return new Session(new blind_structure_1.BlindStructure(blind_structure_1.BlindStructure.initDefaultBlindLevelsWithAnte()));
    }
    /**
     * Getter sessionTimeSeconds
     * @return {number}
     */
    get sessionDurationMs() {
        return this._sessionDurationMs;
    }
    /**
     * Getter remainingLevelDurationSeconds
     * @return {number}
     */
    get remainingLevelDurationMs() {
        return this._remainingLevelDurationMs;
    }
    hasAlreadyStarted() {
        this._hasStarted = true;
    }
}
exports.Session = Session;
//# sourceMappingURL=session.js.map