import {Clock} from './clock';

function init() {

    // Once the page is loaded, update times
    window.addEventListener("load", function(){
        Clock.updateAllTimers();
    });
}

init();
