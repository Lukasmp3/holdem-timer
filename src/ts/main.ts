import {Clock} from './clock';
import {Control} from './control';


function init() {

    Clock.updateAllTimers();
    Control.init();

}

window.addEventListener('load', () => init());
