// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Zq9L":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = void 0;
/**
 * Controlls all dynamic clocks on the 'screen-timer'
 */

var Clock = /*#__PURE__*/function () {
  function Clock(sessionHandler, control) {
    _classCallCheck(this, Clock);

    this._sessionHandler = sessionHandler;
    this._control = control;
    this.init();
  }

  _createClass(Clock, [{
    key: "getCurrentSession",
    value: function getCurrentSession() {
      return this._sessionHandler.session;
    }
    /**
     * Update all timers and periodically repeat
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      var previousTime = Date.now();
      var currentTime;
      this.updateAllTimers(0);
      setInterval(function () {
        currentTime = Date.now();
        var elapsedTime = currentTime - previousTime;

        _this.updateAllTimers(elapsedTime);

        previousTime = currentTime;
      }, Clock.UPDATE_INTERVAL_MS);
    }
    /**
     * The main function responsible for updating and rendering of blinds and timers.
     * If the current level has reached the end, increase the level and playu sound.
     * If the session is paused, don't update the timers.
     *
     * @param realElapsedTimeMs elapsed times from last iteration
     */

  }, {
    key: "updateAllTimers",
    value: function updateAllTimers(realElapsedTimeMs) {
      if (this.getCurrentSession().remainingLevelDurationMs <= 0) {
        this._control.setNextLevel();

        this.playNewRoundSound();
      }

      if (!this._control.isSessionPaused()) {
        // If the session just started, play the new round sound
        if (!this.getCurrentSession().hasStarted) this.playNewRoundSound();
        this.getCurrentSession().hasAlreadyStarted();
        this.updateSessionDurations(realElapsedTimeMs);
      }

      this.renderRealTimer();
      this.renderSessionTimer();
      this.renderRoundTimer();
    }
    /**
     * Update session duration and remaining level duration
     */

  }, {
    key: "updateSessionDurations",
    value: function updateSessionDurations(realElapsedTimeMs) {
      var session = this.getCurrentSession();
      session.increaseSessionDuration(realElapsedTimeMs);
      session.decreaseRemainingLevelDuration(realElapsedTimeMs);
    }
  }, {
    key: "renderSessionTimer",
    value: function renderSessionTimer() {
      var sessionTimeMs = this.getCurrentSession().sessionDurationMs;
      var sessionTime = Clock.millisToMinutesAndSeconds(sessionTimeMs);
      var timeSessionEl = document.querySelector("#time-session-clock");
      timeSessionEl.textContent = sessionTime;
    }
  }, {
    key: "renderRoundTimer",
    value: function renderRoundTimer() {
      var roundTimeMs = this.getCurrentSession().remainingLevelDurationMs;
      var roundTime = Clock.millisToMinutesAndSeconds(roundTimeMs); // console.log('Round time=' + roundTime)

      var timerRoundEl = document.querySelector('#time-round');
      timerRoundEl.textContent = roundTime;
    }
    /**
     * Update the real time for element #time-real
     */

  }, {
    key: "renderRealTimer",
    value: function renderRealTimer() {
      var timeReal = Clock.getCurrentTime();
      var timeRealEl = document.querySelector("#time-real"); // timeRealEl.innerText = timeReal;

      timeRealEl.textContent = timeReal;
    }
    /**
     * Play the sound if the application isn't muted
     */

  }, {
    key: "playNewRoundSound",
    value: function playNewRoundSound() {
      var isMuted = !document.getElementById('sound-toggle').checked;

      if (isMuted) {
        return;
      } else {
        var audio = document.getElementById('sound-round-new');
        audio.play();
      }
    }
    /**
     * Get the current time string and prepend zeros to minute value:
     * Exaple values:
     *   14:05
     *    5:45
     * @returns hour:minute string
     */

  }], [{
    key: "getCurrentTime",
    value: function getCurrentTime() {
      var currentTime = new Date();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      return String(hours).padStart(2) + ':' + String(minutes).padStart(2, '0');
    }
    /**
     * TODO: support for hours
     * Source:
     *   https://stackoverflow.com/a/21294619/13134499
     */

  }, {
    key: "millisToMinutesAndSeconds",
    value: function millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = Number((millis % 60000 / 1000).toFixed(0));
      return seconds == 60 ? minutes + 1 + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
  }]);

  return Clock;
}();

exports.Clock = Clock;
Clock.UPDATE_INTERVAL_MS = 1000;
},{}],"Gcsc":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlindLevel = void 0;

var BlindLevel = /*#__PURE__*/function () {
  /**
   * If not specified ante is 0.
   */
  function BlindLevel(level, values) {
    _classCallCheck(this, BlindLevel);

    this._level = level;
    this._values = values;
  }

  _createClass(BlindLevel, [{
    key: "level",
    get: function get() {
      return this._level;
    }
  }, {
    key: "values",
    get: function get() {
      return this._values;
    }
  }]);

  return BlindLevel;
}();

exports.BlindLevel = BlindLevel;
},{}],"w93X":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlindValues = void 0;

var BlindValues = /*#__PURE__*/function () {
  /**
   * If not specified ante is 0.
   */
  function BlindValues(small, big) {
    var ante = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, BlindValues);

    this._small = small;
    this._big = big;
    this._ante = ante;
  }

  _createClass(BlindValues, [{
    key: "small",
    get: function get() {
      return this._small;
    }
  }, {
    key: "big",
    get: function get() {
      return this._big;
    }
  }, {
    key: "ante",
    get: function get() {
      return this._ante;
    }
  }]);

  return BlindValues;
}();

exports.BlindValues = BlindValues;
},{}],"JS47":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlindStructure = void 0;

var blind_level_1 = require("./blind-level");

var blind_values_1 = require("./blind-values");

var BlindStructure = /*#__PURE__*/function () {
  function BlindStructure(blindLevels) {
    var levelDurationSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 600;

    _classCallCheck(this, BlindStructure);

    this._blindLevels = blindLevels;
    this._currentLevel = 1;
    this._levelDurationSeconds = levelDurationSeconds;
  }
  /**
   *
   * @returns true if the level was increased
   */


  _createClass(BlindStructure, [{
    key: "increaseCurrentLevel",
    value: function increaseCurrentLevel() {
      if (this.currentLevel < this._blindLevels.length) {
        this._currentLevel++;
        return true;
      }

      return false;
    }
    /**
     *
     * @returns true if the level was decreased
     */

  }, {
    key: "decreaseCurrentLevel",
    value: function decreaseCurrentLevel() {
      if (this.currentLevel > 1) {
        this._currentLevel--;
        return true;
      }

      return false;
    }
  }, {
    key: "blindLevels",
    get: function get() {
      return this._blindLevels;
    }
  }, {
    key: "currentLevel",
    get: function get() {
      return this._currentLevel;
    }
  }, {
    key: "levelDurationSeconds",
    get: function get() {
      return this._levelDurationSeconds;
    },
    set: function set(durationS) {
      this._levelDurationSeconds = durationS;
    }
  }], [{
    key: "initDefaultBlindLevelsWithoutAnte",
    value: function initDefaultBlindLevelsWithoutAnte() {
      return [new blind_level_1.BlindLevel(1, new blind_values_1.BlindValues(25, 50)), new blind_level_1.BlindLevel(2, new blind_values_1.BlindValues(50, 100)), new blind_level_1.BlindLevel(3, new blind_values_1.BlindValues(75, 150)), new blind_level_1.BlindLevel(4, new blind_values_1.BlindValues(100, 200)), new blind_level_1.BlindLevel(5, new blind_values_1.BlindValues(150, 300)), new blind_level_1.BlindLevel(6, new blind_values_1.BlindValues(250, 500)), new blind_level_1.BlindLevel(7, new blind_values_1.BlindValues(350, 700)), new blind_level_1.BlindLevel(8, new blind_values_1.BlindValues(500, 1000)), new blind_level_1.BlindLevel(9, new blind_values_1.BlindValues(750, 1500)), new blind_level_1.BlindLevel(10, new blind_values_1.BlindValues(1000, 2000)), new blind_level_1.BlindLevel(11, new blind_values_1.BlindValues(1500, 3000)), new blind_level_1.BlindLevel(12, new blind_values_1.BlindValues(2000, 4000))];
    }
  }, {
    key: "initDefaultBlindLevelsWithAnte",
    value: function initDefaultBlindLevelsWithAnte() {
      return [new blind_level_1.BlindLevel(1, new blind_values_1.BlindValues(25, 50, 5)), new blind_level_1.BlindLevel(2, new blind_values_1.BlindValues(50, 100, 5)), new blind_level_1.BlindLevel(3, new blind_values_1.BlindValues(75, 150, 10)), new blind_level_1.BlindLevel(4, new blind_values_1.BlindValues(100, 200, 10)), new blind_level_1.BlindLevel(5, new blind_values_1.BlindValues(150, 300, 25)), new blind_level_1.BlindLevel(6, new blind_values_1.BlindValues(250, 500, 50)), new blind_level_1.BlindLevel(7, new blind_values_1.BlindValues(350, 700, 75)), new blind_level_1.BlindLevel(8, new blind_values_1.BlindValues(500, 1000, 100)), new blind_level_1.BlindLevel(9, new blind_values_1.BlindValues(750, 1500, 150)), new blind_level_1.BlindLevel(10, new blind_values_1.BlindValues(1000, 2000, 200)), new blind_level_1.BlindLevel(11, new blind_values_1.BlindValues(1500, 3000, 250)), new blind_level_1.BlindLevel(12, new blind_values_1.BlindValues(2000, 4000, 300))];
    }
  }]);

  return BlindStructure;
}();

exports.BlindStructure = BlindStructure;
},{"./blind-level":"Gcsc","./blind-values":"w93X"}],"cyEl":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Session = void 0;

var blind_structure_1 = require("./blinds/blind-structure");
/**
 * Init and maintains one game session with defined blind structure.
 *
 * Contains information about the total session time and remaining time to the next level.
 */


var Session = /*#__PURE__*/function () {
  function Session($blindStructure) {
    _classCallCheck(this, Session);

    this._hasStarted = false;
    this._blindStructure = $blindStructure;
    this._sessionDurationMs = 0;
    this._remainingLevelDurationMs = $blindStructure.levelDurationSeconds * 1000;
  }

  _createClass(Session, [{
    key: "blindStructure",
    get: function get() {
      return this._blindStructure;
    }
  }, {
    key: "hasStarted",
    get: function get() {
      return this._hasStarted;
    }
  }, {
    key: "increaseSessionDuration",
    value: function increaseSessionDuration(durationMs) {
      this._sessionDurationMs += durationMs;
    }
  }, {
    key: "decreaseRemainingLevelDuration",
    value: function decreaseRemainingLevelDuration(durationMs) {
      this._remainingLevelDurationMs -= durationMs;
    }
  }, {
    key: "resetRemainingLevelDuration",
    value: function resetRemainingLevelDuration() {
      this._remainingLevelDurationMs = this._blindStructure.levelDurationSeconds * 1000;
    }
  }, {
    key: "sessionDurationMs",
    get:
    /**
     * Getter sessionTimeSeconds
     * @return {number}
     */
    function get() {
      return this._sessionDurationMs;
    }
    /**
     * Getter remainingLevelDurationSeconds
     * @return {number}
     */

  }, {
    key: "remainingLevelDurationMs",
    get: function get() {
      return this._remainingLevelDurationMs;
    }
  }, {
    key: "hasAlreadyStarted",
    value: function hasAlreadyStarted() {
      this._hasStarted = true;
    }
  }], [{
    key: "initDefaultSession",
    value: function initDefaultSession() {
      return new Session(new blind_structure_1.BlindStructure(blind_structure_1.BlindStructure.initDefaultBlindLevelsWithoutAnte()));
    }
  }, {
    key: "initDefaultSessionWithAnte",
    value: function initDefaultSessionWithAnte() {
      return new Session(new blind_structure_1.BlindStructure(blind_structure_1.BlindStructure.initDefaultBlindLevelsWithAnte()));
    }
  }]);

  return Session;
}();

exports.Session = Session;
},{"./blinds/blind-structure":"JS47"}],"JGVJ":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Control = void 0;

var session_1 = require("./session");

var Control = /*#__PURE__*/function () {
  function Control(sessionHandler) {
    var _this = this;

    _classCallCheck(this, Control);

    this.sessionHandler = sessionHandler;
    this.onClick('control-rewind', function () {
      return _this.setPreviousLevel();
    });
    this.onClick('control-forward', function () {
      return _this.setNextLevel();
    });
    this.onChange('screen-a', function () {
      return _this.initDefaultSession();
    });
    this.onChange('screen-b', function () {
      return _this.runNewSession();
    });
  }

  _createClass(Control, [{
    key: "isSessionPaused",
    value: function isSessionPaused() {
      var pauseEl = document.querySelector("#input-control-pause");
      return pauseEl.checked ? true : false;
    }
    /**
     * Increase level and re-render if changed
     */

  }, {
    key: "setNextLevel",
    value: function setNextLevel() {
      if (this.getCurrentSession().blindStructure.increaseCurrentLevel()) {
        this.getCurrentSession().resetRemainingLevelDuration();
        this.renderBlindStructure();
      }
    }
  }, {
    key: "getCurrentSession",
    value: function getCurrentSession() {
      return this.sessionHandler.session;
    }
  }, {
    key: "onClick",
    value: function onClick(id, cb) {
      var el = document.getElementById(id);
      el.addEventListener('click', cb);
    }
  }, {
    key: "onChange",
    value: function onChange(newId, cb) {
      var el = document.getElementById(newId);
      el.addEventListener('change', cb);
    }
  }, {
    key: "initDefaultSession",
    value: function initDefaultSession() {
      console.log('Init default session');
      this.sessionHandler.session = session_1.Session.initDefaultSession();
    }
  }, {
    key: "runNewSession",
    value: function runNewSession() {
      this.setBlindsStucture();
      this.renderNewSession();
      this.renderBlindStructure();
    }
  }, {
    key: "setBlindsStucture",
    value: function setBlindsStucture() {
      var anteIsEnabled = document.getElementById("ante-toggle").checked;

      if (anteIsEnabled) {
        this.sessionHandler.session = session_1.Session.initDefaultSessionWithAnte();
      } else {
        this.sessionHandler.session = session_1.Session.initDefaultSession();
      }

      var levelDuration = document.getElementById("duration-option").value;
      console.log('Create a new blind structure with level duration=' + levelDuration);
      this.getCurrentSession().blindStructure.levelDurationSeconds = 60 * Number(levelDuration);
      this.getCurrentSession().resetRemainingLevelDuration();
    }
    /**
     * Creates a new configured session
     */

  }, {
    key: "renderNewSession",
    value: function renderNewSession() {
      console.log('Start the session');
      document.querySelector('#input-control-play').checked = false;
      document.querySelector('#input-control-pause').checked = true;
    }
  }, {
    key: "renderBlindStructure",
    value: function renderBlindStructure() {
      var blindStructure = this.getCurrentSession().blindStructure;
      var currentLevel = blindStructure.currentLevel;
      var currentBlindLevelValues = blindStructure.blindLevels[currentLevel - 1].values;
      var blindsValueText = currentBlindLevelValues.small.toString() + '\n' + currentBlindLevelValues.big.toString();
      this.renderBlindInformation('blinds-value', blindsValueText);
      this.renderBlindInformation('blinds-round', currentLevel.toString());
      this.renderBlindInformation('blinds-ante', currentBlindLevelValues.ante.toString());
    }
  }, {
    key: "renderBlindInformation",
    value: function renderBlindInformation(id, value) {
      var blindsValueEl = document.getElementById(id);
      blindsValueEl.innerText = value;
    }
    /**
     * Decrease level and re-render
     */

  }, {
    key: "setPreviousLevel",
    value: function setPreviousLevel() {
      this.getCurrentSession().blindStructure.decreaseCurrentLevel();
      this.getCurrentSession().resetRemainingLevelDuration();
      this.renderBlindStructure();
    }
  }]);

  return Control;
}();

exports.Control = Control;
},{"./session":"cyEl"}],"TNrg":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionHandler = void 0;

var session_1 = require("./session");
/**
 * Dummy implementation of session handler
 *
 * TODO: Only one session shoudl exist at one time (singleton)
 */


var SessionHandler = /*#__PURE__*/function () {
  function SessionHandler() {
    _classCallCheck(this, SessionHandler);

    console.log('Create a new session');
    this._session = session_1.Session.initDefaultSession();
  }

  _createClass(SessionHandler, [{
    key: "session",
    get: function get() {
      return this._session;
    },
    set: function set(session) {
      this._session = session;
    }
  }]);

  return SessionHandler;
}();

exports.SessionHandler = SessionHandler;
},{"./session":"cyEl"}],"uSDM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var clock_1 = require("./clock");

var control_1 = require("./control");

var session_handler_1 = require("./session-handler");

function init() {
  var sessionHandler = new session_handler_1.SessionHandler();
  var control = new control_1.Control(sessionHandler);
  new clock_1.Clock(sessionHandler, control);
}

window.addEventListener('load', function () {
  return init();
});
},{"./clock":"Zq9L","./control":"JGVJ","./session-handler":"TNrg"}]},{},["uSDM"], null)
//# sourceMappingURL=main.ac527df1.js.map