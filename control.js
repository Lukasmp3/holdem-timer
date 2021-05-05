"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Control = void 0;
const session_1 = require("./session");
class Control {
    constructor(sessionHandler) {
        this.sessionHandler = sessionHandler;
        this.onClick('control-rewind', () => this.setPreviousLevel());
        this.onClick('control-forward', () => this.setNextLevel());
        this.onChange('screen-a', () => this.initDefaultSession());
        this.onChange('screen-b', () => this.runNewSession());
    }
    isSessionPaused() {
        const pauseEl = document.querySelector("#input-control-pause");
        return (pauseEl.checked) ? true : false;
    }
    /**
     * Increase level and re-render if changed
     */
    setNextLevel() {
        if (this.getCurrentSession().blindStructure.increaseCurrentLevel()) {
            this.getCurrentSession().resetRemainingLevelDuration();
            this.renderBlindStructure();
        }
    }
    getCurrentSession() { return this.sessionHandler.session; }
    onClick(id, cb) {
        const el = document.getElementById(id);
        el.addEventListener('click', cb);
    }
    onChange(newId, cb) {
        const el = document.getElementById(newId);
        el.addEventListener('change', cb);
    }
    initDefaultSession() {
        console.log('Init default session');
        this.sessionHandler.session = session_1.Session.initDefaultSession();
    }
    runNewSession() {
        this.setBlindsStucture();
        this.renderNewSession();
        this.renderBlindStructure();
    }
    setBlindsStucture() {
        const anteIsEnabled = document.getElementById("ante-toggle").checked;
        if (anteIsEnabled) {
            this.sessionHandler.session = session_1.Session.initDefaultSessionWithAnte();
        }
        else {
            this.sessionHandler.session = session_1.Session.initDefaultSession();
        }
        const levelDuration = document.getElementById("duration-option").value;
        console.log('Create a new blind structure with level duration=' + levelDuration);
        this.getCurrentSession().blindStructure.levelDurationSeconds = 60 * Number(levelDuration);
        this.getCurrentSession().resetRemainingLevelDuration();
    }
    /**
     * Creates a new configured session
     */
    renderNewSession() {
        console.log('Start the session');
        document.querySelector('#input-control-play').checked = false;
        document.querySelector('#input-control-pause').checked = true;
    }
    renderBlindStructure() {
        const blindStructure = this.getCurrentSession().blindStructure;
        const currentLevel = blindStructure.currentLevel;
        const currentBlindLevelValues = blindStructure.blindLevels[currentLevel - 1].values;
        const blindsValueText = currentBlindLevelValues.small.toString() + '\n' + currentBlindLevelValues.big.toString();
        this.renderBlindInformation('blinds-value', blindsValueText);
        this.renderBlindInformation('blinds-round', currentLevel.toString());
        this.renderBlindInformation('blinds-ante', currentBlindLevelValues.ante.toString());
    }
    renderBlindInformation(id, value) {
        const blindsValueEl = document.getElementById(id);
        blindsValueEl.innerText = value;
    }
    /**
     * Decrease level and re-render
     */
    setPreviousLevel() {
        this.getCurrentSession().blindStructure.decreaseCurrentLevel();
        this.getCurrentSession().resetRemainingLevelDuration();
        this.renderBlindStructure();
    }
}
exports.Control = Control;
//# sourceMappingURL=control.js.map