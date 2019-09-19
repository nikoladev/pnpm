# fetch-from-npm-registry

> A fetch lib specifically for using with the npm registry

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/fetch-from-npm-registry.svg)](https://www.npmjs.com/package/fetch-from-npm-registry)
<!--/@-->

## Installation

```sh
<pnpm|npm|yarn> add fetch-from-npm-registry
```

## Usage

<!--@example('./example.js')-->
```js
'use strict'
const createFetcher = require('fetch-from-npm-registry').default

const fetchFromNpmRegistry = createFetcher({userAgent: 'fetch-from-npm-registry'})

fetchFromNpmRegistry('https://registry.npmjs.org/is-positive')
  .then(res => res.json())
  .then(metadata => console.log(JSON.stringify(metadata.versions['1.0.0'], null, 2)))
  //> {
  //    "name": "is-positive",
  //    "version": "1.0.0",
  //    "devDependencies": {
  //      "ava": "^0.0.4"
  //    },
  //    "_hasShrinkwrap": false,
  //    "directories": {},
  //    "dist": {
  //      "shasum": "88009856b64a2f1eb7d8bb0179418424ae0452cb",
  //      "tarball": "https://registry.npmjs.org/is-positive/-/is-positive-1.0.0.tgz"
  //    },
  //    "engines": {
  //      "node": ">=0.10.0"
  //    }
  //  }
```
<!--/@-->

## API

### `fetchFromNpmRegistry(url, opts)`

#### Arguments

- **url** - _String_ - url to request
- **opts.fullMetadata** - _Boolean_ - If true, don't attempt to fetch filtered ("corgi") registry metadata. (default: false)

## License

MIT © [Zoltan Kochan](https://www.kochan.io/)
