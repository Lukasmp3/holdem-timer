import { Clock } from './clock';
import { Control } from './control';
import { SessionHandler } from './session-handler';



function init() {

    Clock.updateAllTimers();
    Control.init();
    SessionHandler.init();

}

window.addEventListener('load', () => init());
