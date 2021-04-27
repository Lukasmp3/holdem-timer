import { Clock } from './clock';
import { Control } from './control';
import { SessionHandler } from './session-handler';



function init() {


    Clock.updateAllTimers();
    const sessionHandler = new SessionHandler();
    new Control(sessionHandler);

}

window.addEventListener('load', () => init());
