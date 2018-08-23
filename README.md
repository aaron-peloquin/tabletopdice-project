# TabletopDice.com Application
This web application is intended for use during a tabletop gaming session. It is currently hosted at [TabletopDice.com](https://TabletopDice.com/).

_* All graphics of dice in this application were generiously donated by Arvil._

## Usage
This project includes a number of modular polymer elements located in the /src/ttd/ folder. They reference the dice images in /images/ folder, too.

### Example
```html
<ttd-tray>
    <!-- Displays a readout of the dice that have been rolled. -->
    <ttd-history excited></ttd-history>

    <!-- Creates a 20-sided die button -->
    <ttd-die sides="20"></ttd-die>

    <!-- Creates a 6-sided die button -->
    <ttd-die></ttd-die>

    <!-- Creates a 44-sided die button -->
    <ttd-die sides="44"></ttd-die>

    <!-- Displays a readout of the sum from all dice that have been rolled with a dropdown of die types to exclude form this sum -->
    <ttd-total exclude exclude-die="20"></ttd-total>

    <!-- Reset (clear) all roll data in this tray -->
    <ttd-clear>Erase Roll Data</ttd-clear>

    <!--Displays an input field for a custom sided die & a button to roll all custom dice elements -->
    <ttd-custom></ttd-custom>
    <ttd-custom-roll></ttd-custom-roll>

    <!-- Displays the highest and lowest values rolled from one type of die -->
    <ttd-high-low die="20"></ttd-high-low>

    <!-- Displays a 'dice logic string' input field, exclude dropdown, a total, and a button to 'roll the equation' -->
    <ttd-equation placeholder="example: 2d6+2"></ttd-equation>
</ttd-tray>
```
### &lt;ttd-tray&gt;
This custom element is **required** to wrap around all other &lt;ttd-*&gt; elements, handling click events and shared data between them. I opted to use this method, since it means you can run multiple instances of dice trays on a single page.

Events that can be dispatched (fired/called) or listened to on this element:
* **_updateHistory** dispatched whenever this.results is changed
* **_updateSum**, dispatched whenever this.sum is changed
* **_recalculateSum**, dispatched whenever you would like the sum to be recalculated
* **_clearResults**, dispatched whenever an element wants to clear the rolled results
* **_rollCustomDie**, dispatched whenever the custom dice are requested to be rolled


### &lt;ttd-history&gt;
Displays a historical readout (in `<ol>` / `<li>` format) of rolls, comes nativly with horizontal scrolling. Results are displayed as the value rolled with an image of the die behind it.

This element has an optional attribute of `excited`. Adding this attribute causes the program to add a `!` to critical rolls (when the result rolled is the same as the sides of the die).

A user may copy/paste from this element to recieve the sides of the die rolled as well. This text is also visible to screen readers (ie `3(from d6) 1(from d6) 4!(from d4) 12(from d20) 20!(from d20)`).

### &lt;ttd-die&gt;
Creates a clickable ui element that rolls a die. The `sides` attribute sets how many sides each `<ttd-die>` element has.

### &lt;ttd-sum&gt;
Displays a readout of the sum from all dice rolled.

### &lt;ttd-clear&gt;
Creates a clickable ui element that resets the application's roll data. You may slot in your own copy text, but the default is "Clear".


## This project utlizes:
These are the key things I focused on learning while building this application. 
* Javascript
	* Polymer v3. I used the polymer starter kit as a base.
      * Single Page Application (SPA)
      * Progressive Web App (PWA)
    * Web Components
	* Some ES
* CSS
	* Grid
	* Variables
* AWS 
	* Route 53
  * Simple Storage Service (S3)
  * CloudFront with a Certificate for HTTPS + HTTP/2
