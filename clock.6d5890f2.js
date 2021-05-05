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
},{}]},{},["Zq9L"], null)
//# sourceMappingURL=clock.6d5890f2.js.map