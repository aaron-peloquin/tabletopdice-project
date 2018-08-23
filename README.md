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

    <!-- Creates a readout of the sum from all dice that have been rolled -->
    <ttd-total exclude exclude-die="20"></ttd-total>

    <!-- Creates a reset (clear) all roll data in this tray -->
    <ttd-clear>Erase Roll Data</ttd-clear>

    <!-- Creates an input field for a custom sided die -->
    <ttd-custom></ttd-custom>

    <!-- Creates a button to roll all custom dice elements -->
    <ttd-custom-roll></ttd-custom-roll>

    <!-- Creates the highest and lowest values rolled from one type of die -->
    <ttd-high-low die="20"></ttd-high-low>

    <!-- Creates a 'dice logic' input field, exclude dropdown, a total, and a submit button -->
    <ttd-equation placeholder="example: 2d6+2"></ttd-equation>
</ttd-tray>
```
### &lt;ttd-tray&gt;
This custom element is **required** to wrap around all other &lt;ttd-*&gt; elements, handling click events and shared data between them. I opted to use this method, since it means you can run multiple instances of dice trays on a single page.

Events that can be dispatched (fired/called) or listened to on this element:
* **_updateHistory** dispatched whenever this.results is changed
* **_clearResults**, dispatched whenever an element wants to clear the rolled results
* **_rollCustomDie**, dispatched whenever the custom dice are requested to be rolled


### &lt;ttd-history&gt;
Creates a historical readout (in `<ol>` / `<li>` format) of rolls, comes nativly with horizontal scrolling in supported browsers. Results are displayed as the value rolled with an image of the die behind it.

This element has an optional attribute of `excited`. Adding this attribute causes the program to add a `!` to critical rolls (when the result rolled is the same as the sides of the die).

A user may copy/paste from this element to recieve the sides of the die rolled as well. This text is also visible to screen readers (ie `3(from d6) 1(from d6) 4!(from d4) 12(from d20) 20!(from d20)`).

### &lt;ttd-die&gt;
Creates a clickable ui element that rolls a die. The `sides` attribute sets how many sides each `<ttd-die>` element has.

### &lt;ttd-total&gt;
Creates a readout of the sum from all dice rolled with an optional attribute of `exclude` to add in a `<select>` of a dice type to exclude, and `exclude-die` to set the default value of that select dropdown.

### &lt;ttd-clear&gt;
Creates a clickable ui element that resets the application's roll data. You may slot in your own copy text, but the default is "Clear".

### &lt;ttd-custom&gt;
Creates a user input for a custom sided die that can be rolled by submitting the `<form>` that is in shadowdom wrapped around the input, or by clicking the button created by `<ttd-custom-roll></ttd-custom-roll>`.

### &lt;ttd-high-low&gt;
Creates a readout of the highest and lowest values rolled by a specific die, which is set by using the `die` attribute.

### &lt;ttd-equation&gt;
Creates a number of ui elements that allow the user to write a math equation involving dice strings (eg. 1d4), set a type of die that will be excluded from the equation's total, then roll the equation and view it's output.

The use-case for this in dungeons & dragons would be a rogue using a dagger to attack and calculate their damage total at the same time with 1d4+2d6+2+1d20, then exclude d20's from the results. Rolling this equation would show the damage in the result, and the d20 would appear in any `<ttd-history>` and `<ttd-high-low die="20">` elements to quickly see if they hit or not.

You may also set an attribute of `placeholder` to set the input field's placeholder text.

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
