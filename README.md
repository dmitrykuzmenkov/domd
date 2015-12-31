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
<html>
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <button class="js-button">Click me</button>
</body>
</html>
```

```javascript
var domd = require('domd');
var d = domd(document.body);

d.on('click', '.js-button', function(ev, el) {
  console.log('Button clicked!');
});

```

## Methods

### on(event, selector, callback, use_capture)

Bind new listener to all elements.

- *event* - javascript event to catch (click, keyup and etc)
- *selector* - valid document query selector
- *callback* - function to callback. Arguments: event, element
- *use_capture* - use capture or not, default false

### off(event, selector)

Disable listeners from all elements using selector.

- *event* - javascript event
- *selector* - valid document query selector
