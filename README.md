DOMD
======
Tiny dependency free DOM delegator.

## Installation

Use npm package manager to install the DOM delegator
```bash
npm install domd
```

## Usage

Follow the example:

```html
<button class="js-button">Click me</button>
```

```javascript
var domd = require('domd');
var d = domd(document.body);

d.on('click', '.js-button', function(ev, el) {
  console.log('Button clicked!');
});

```

## Methods

### on(event, selector, callback)

Bind new listener to all elements.

- *event* - javascript event to catch (click, keyup and etc)
- *selector* - valid document query selector
- *callback* - function to callback. Arguments: event, element

### off(event, selector)

Disable listeners from all elements using selector.

- *event* - javascript event
- *selector* - valid document query selector
