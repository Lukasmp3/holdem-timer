import { Session } from "./session";

/**
 * Implementation of session handler
 * 
 * TODO: Only one session should exist at one time (singleton)
 */
export class SessionHandler {

    private _session: Session;

    public constructor() {
        console.log('Create a new session');
        this._session = Session.initDefaultSession();
    }

    public set session(session: Session) {
        this._session = session;
    }

    public get session(): Session {
        return this._session;
    }

}