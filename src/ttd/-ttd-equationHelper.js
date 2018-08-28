/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `-TtdEquationHelper`
 * Extended by child elements of <ttd-tray> for shared functionality
 *
 * @helperClass
 * @polymer
 * @export TtdChildHelper
 */
class TtdEquationHelper extends TtdChildHelper {
  /**
   * Strips out all non-digit and non-d characters, then forces them all to lowercase
   * @param {str} diceEquation a dice equation string
   */
  cleanseEquationStr(diceEquation) {
    return diceEquation.replace(/([^\d|d|\+|\-|\*|\/|\(|\)])/gi, '').toLowerCase();
  }

  /**
   * Run an equation, log outcome with gtag()
   * @param {str} diceEquation An already parsed equation string, containing no #d#
   * @param {str} rawEquation The original equation, containing #d#. Only used to log in gtag()
   * @returns {num} The equation's result
   */
  runEquation(equation, rawEquation) {
    try {
      /**
       * It should be reasonably safe to run eval() here, since we have already stripped out everything except
       * for digits, the lowercase letter 'd', and equation symbols (+, -, *, /)
      */
      let equationResult = Math.round(eval(equation));
      if(isNaN(equationResult)) {
        throw "Invalid equation (NaN)";
      }
      equationResult = equationResult.toLocaleString();
      /** Report equation results to google analytics */
      if(typeof gtag=='function') {
        gtag('event', 'rollEquation', {
          "event_category":"roll",
          "event_label": rawEquation,
          "dieEquation": equation,
          "rollResult": this.result
        });
      }
      return equationResult;
    }

    /** Throw custom error on failure to parse. */
    catch(e) {
      console.error('Invalid Dice String Equation: ',equation);
      this.result = "ERR";
      /** Report error to Google Analytics */
      if(typeof gtag=='function') {
        gtag('event', 'rollEquationError', {
          "event_category":"error",
          "event_label": rawEquation,
          "dieEquation": equation
        });
      }
      return 0;
    }
  }

  /**
   * Find all sets of #d# in an equation string and roll those dice
   * @param {str} diceEquation 
   */
  rollEquationDice(diceEquation) {
    let _this = this;
    diceEquation = diceEquation.replace(/(\d+d+?\d+)/gi, function(dieString) {
      return _this.rollDie(dieString, _this);
    });
    return diceEquation;
  }

  /**
   * Roll a single die string (#d#), and set results into this.rolledResults
   */
  rollDie(dieString, _this) {
    let rollResult = 0;
    let trayResults = [];

    /** Get the number of dice and number of sides */
    let diceNumSides = dieString.split('d');
    if(diceNumSides.length!=2) {
      /** invalid dice string (eg. 1d4 and 20d100), return the original dieString */
      return dieString;
    }
    else {
      let diceNum = parseInt(diceNumSides[0]);
      let diceSides = parseInt(diceNumSides[1]);

      /** Don't allow a user to roll more than 999 dice in one set */
      if(diceNum > 999) {
        diceNum = 999;
      }

      /** Don't allow a user to roll a die with more than 999 sides */
      if(diceSides > 999) {
        diceSides = 999;
      }

      for(let i=0; i<diceNum;i++) {
        Math.seedrandom();
        let value = (Math.random() * diceSides | 0) + 1;
        rollResult += value;
        _this.trayElement.results.push({"sides":diceSides, "result":value});
      }
      return rollResult;
    }
  }
}

export {TtdEquationHelper};