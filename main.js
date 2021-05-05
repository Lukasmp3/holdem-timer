"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clock_1 = require("./clock");
const control_1 = require("./control");
const session_handler_1 = require("./session-handler");
function init() {
    const sessionHandler = new session_handler_1.SessionHandler();
    const control = new control_1.Control(sessionHandler);
    new clock_1.Clock(sessionHandler, control);
}
window.addEventListener('load', () => init());
//# sourceMappingURL=main.js.map