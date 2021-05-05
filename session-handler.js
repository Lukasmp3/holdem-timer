"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionHandler = void 0;
const session_1 = require("./session");
/**
 * Dummy implementation of session handler
 *
 * TODO: Only one session shoudl exist at one time (singleton)
 */
class SessionHandler {
    constructor() {
        console.log('Create a new session');
        this._session = session_1.Session.initDefaultSession();
    }
    set session(session) {
        this._session = session;
    }
    get session() {
        return this._session;
    }
}
exports.SessionHandler = SessionHandler;
//# sourceMappingURL=session-handler.js.map