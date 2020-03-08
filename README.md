# Fugle

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]

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

## License

MIT © [Chun-Kai Wang](https://github.com/chunkai1312)

[npm-image]: https://img.shields.io/npm/v/fugle.svg
[npm-url]: https://npmjs.org/package/fugle
[travis-image]: https://img.shields.io/travis/chunkai1312/fugle.svg
[travis-url]: https://travis-ci.org/chunkai1312/fugle
[codecov-image]: https://img.shields.io/codecov/c/github/chunkai1312/fugle.svg
[codecov-url]: https://codecov.io/gh/chunkai1312/fugle
