import { Clock } from './clock';
import { Control } from './control';
import { SessionHandler } from './session-handler';



function init() {

    const sessionHandler = new SessionHandler();
    const control = new Control(sessionHandler);
    new Clock(sessionHandler, control);

}

window.addEventListener('load', () => init());
