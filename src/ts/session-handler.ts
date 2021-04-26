import { BlindStructure } from "./blinds/blind-structure";
import { Session } from "./session";

/**
 * Dummy implementation of session handler
 * 
 * TODO: Only one session shoudl exist at one time (singleton)
 */
export class SessionHandler {

    private static session: Session;

    public static init(): void {
        this.session = new Session(new BlindStructure(BlindStructure.initDefaultBlindLevels()));
    }

    public static newSession(session: Session) {
        this.session = session;
    }

    public static getSession(): Session {
        return this.session;
    }

}