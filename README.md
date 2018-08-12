# TabletopDice.com Application
This web application is intended for use during a tabletop gaming session. It is currently hosted at [TabletopDice.com](https://TabletopDice.com/).

_* Dice graphics in this application were generiously donated by Arvil._

## Usage
This project includes a number of polymer elements located in the /src/ttd/ folder. They reference the dice images in /images/ folder, too.

### Example
```html
<ttd-tray>
	<!-- Displays a readout of the dice that have been rolled. -->
	<ttd-history excited></ttd-history>

	<!-- Displays a readout of the sum from all dice that have been rolled. -->
	<ttd-sum></ttd-sum>

	<!-- Creates a 20-sided die button -->
    <ttd-die sides="20"></ttd-die>
    
    <!-- Creates a 6-sided die button -->
    <ttd-die></ttd-die>
    
    <!-- Creates a 44-sided die button -->
    <ttd-die sides="44"></ttd-die>
    
    <!-- Creates a 44-sided die button -->
    <ttd-clear>Erase Roll Data</ttd-clear>
</ttd-tray>
```
### &lt;ttd-tray&gt;
This custom element wraps around all other &lt;ttd-*&gt; elements, handling click events and shared data between them. I opted to use this method, since it means you can run multiple instances of dice trays on a single page.

Events that can be fired or listened to on this element:
* **_updateHistory** dispatched whenever this.results is changed
* **_updateSum**, dispatched whenever this.sum is changed
* **_recalculateSum**, dispatched whenever you would like the sum to be recalculated
* **_clearResults**, dispatched whenever an element wants to clear the rolled results
* **_rollCustomDie**, dispatched whenever the custom dice are requested to be rolled


### &lt;ttd-history&gt;
### &lt;ttd-sum&gt;
### &lt;ttd-die&gt;
### &lt;ttd-clear&gt;
Clears the application's roll data.



## This project utlizes:
* Polymer v3 (PWA, ES, SPA)
	* Used Polymer Starter Kit as a base
* CSS Grid
