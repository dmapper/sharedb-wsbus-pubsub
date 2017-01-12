# sharedb-wsbus-pubsub

ShareDb PubSub module based on ws-bus

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


## Installation

```
npm install sharedb-wsbus-pubsub
```

## Usage

```js
const racer = require('racer')
const shareDbMongo = require('sharedb-mongo')
const wsbusPubSub = require('sharedb-wsbus-pubsub')

const mongo = shareDbMongo('mongodb://localhost:27017')
const pubsub = wsbusPubSub('ws://localhost:3000')

const backend = racer.createBackend({
  db: mongo,
  pubsub: pubsub
})
```

## License

MIT