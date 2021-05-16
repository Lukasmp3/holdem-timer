"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Control = void 0;
const session_1 = require("./session");
/**
 * Responsible for all buttons and controllers in the application.
 */
class Control {
    constructor(sessionHandler) {
        this._sessionHandler = sessionHandler;
        this._customSound = null;
        console.log('ima heree');
        this.onClick('control-rewind', () => this.setPreviousLevel());
        this.onClick('control-forward', () => this.setNextLevel());
        this.onChange('screen-a', () => this.initDefaultSession());
        this.onChange('screen-b', () => this.runNewSession());
        this.listenForDndSounds();
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
    getCustomSound() {
        return this._customSound;
    }
    getCurrentSession() { return this._sessionHandler.session; }
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
        this._sessionHandler.session = session_1.Session.initDefaultSession();
    }
    runNewSession() {
        this.setBlindsStucture();
        this.renderNewSession();
        this.renderBlindStructure();
    }
    setBlindsStucture() {
        const anteIsEnabled = document.getElementById("ante-toggle").checked;
        if (anteIsEnabled) {
            this._sessionHandler.session = session_1.Session.initDefaultSessionWithAnte();
        }
        else {
            this._sessionHandler.session = session_1.Session.initDefaultSession();
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
    listenForDndSounds() {
        const dnd = document.querySelector("#sound-custom-dnd");
        dnd.addEventListener('dragover', x => this.onDragOver(x));
        dnd.addEventListener('drop', x => this.onDrop(x));
    }
    onDragOver(e) {
        e.preventDefault();
    }
    onDrop(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        const file = files[0];
        console.log('Loaded file with name=' + file.name);
        if (!file.type.includes('audio'))
            return;
        const fr = new FileReader();
        fr.addEventListener('load', e => {
            var _a;
            // const audio = new Audio();
            const audioInfo = document.querySelector("#sound-custom-info");
            audioInfo.innerText = "Loaded:\n" + file.name.substring(0, 50);
            const soundContent = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            this._customSound = new Audio(soundContent);
        });
        fr.readAsDataURL(file);
    }
}
exports.Control = Control;
//# sourceMappingURL=control.js.map