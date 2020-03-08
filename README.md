# Fugle

> Fugle API client library for JavaScript

## Install

```sh
$ npm install --save fugle
```

### Browser

Add a `<script>` to your `index.html`:

```html
<script src="/node_modules/fugle/dist/fugle.min.js"></script>
```

### Node.js / Webpack

Import the module to your `*.js` file:

```js
const Fugle = require('fugle')
```

## Usage

The library support for REST API and WebSocket.

### REST API

```js
const fugle = new Fugle({ apiToken: 'demo' })

fugle
  .api('/intraday/quote', { symbolId: '2884' })
  .then(res => console.log(res.data))
```

### WebSocket

```js
const fugle = new Fugle({ apiToken: 'demo' })

fugle
  .ws('/intraday/quote', { symbolId: '2884' })
  .onmessage = message => console.log(message.data)
```

## Reference

[Fugle API](https://developer.fugle.tw)
