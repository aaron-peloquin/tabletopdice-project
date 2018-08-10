import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 * @ttd
 *  Events:
 *    _updateHistory, dispatched whenever this.results is changed
 *    _updateSum, dispatched whenever this.sum is changed
 *    _recalculateSum, dispatched whenever you would like the sum to be recalculated
 *    _clearResults, dispatched whenever an element wants to clear the rolled results
 *    _rollCustomDie, dispatched whenever the custom dice are requested to be rolled
 */
class TtdTray extends PolymerElement {
  static get template() {
    return html`
      <slot></slot>
    `;
  }
  static get properties() {
    return {
      results: {
        type: Array,
        value: function(){ return []; },
      },
      sum: {
        type: Number,
        value: 0,
      },
      exclude: {
        type: Number,
        value: 0,
      },
    };
  }

  ready(){
    super.ready();
    // Add listener for _clearResults to clear this tray's roll results.
    this.addEventListener('_clearResults', e => {this.clearResults(e)});
    this.addEventListener('_recalculateSum', e => {this.recalculateSum(e)});
  }

  // Called by child elements to roll a basic die.
  roll(sides){
    var value = Math.floor(Math.random() * Math.floor(sides)) + 1;
    this.results.push({"sides":sides,"result":value});

    this.dispatchEvent(new CustomEvent('_recalculateSum'));
    this.updateHistoricalNodes();
  }

  // Change the current .sum values.
  recalculateSum(){
    var exclude = this.exclude;
    var newSum = 0;
    // Loop throuh all results and add them together, excluding any rolls that were made by the excluded die.
    if(this.results.length>0){
      this.results.forEach(function(roll){
        if(roll.sides!=exclude){
          newSum += roll.result;
        }
      });
    }

    // Update this.sum and push to nodes.
    this.sum = newSum;
    this.updateSumNodes();
  }

  // Update the results of all historical listeners.
  updateHistoricalNodes(){
    // Reverse order of the results so newest rolls are at the beginning of the array.
    // Dispatch _updateHistory event to all child elements that are listening.
    this.dispatchEvent(new CustomEvent('_updateHistory', {detail: {data:this.results}}));
  }

  // Update the sum of all sum listeners.
  updateSumNodes(){
    // Dispatch _updateSum event to all child elements that are listening.
    var newSum = this.sum;
    this.dispatchEvent(new CustomEvent('_updateSum', {detail: {data:newSum}}));
  }

  // Clear historical roll data
  clearResults(){
    this.results = [];
    this.updateHistoricalNodes();

    this.sum = 0;
    this.updateSumNodes();
  }
}

window.customElements.define('ttd-tray', TtdTray);
