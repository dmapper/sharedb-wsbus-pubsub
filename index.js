const bus = require('ws-bus')
const PubSub = require('sharedb').PubSub

function WsBusPubSub (url, protocols, options = {}) {
  if (!(this instanceof WsBusPubSub)) return new WsBusPubSub(url, protocols, options)
  PubSub.call(this, options)

  this.client = bus.createClient(url, protocols, options)
}

module.exports = WsBusPubSub

WsBusPubSub.prototype = Object.create(PubSub.prototype)

WsBusPubSub.prototype.close = function (callback) {
  if (!callback) {
    callback = function (err) {
      if (err) throw err
    }
  }

  PubSub.prototype.close.call(this, (err) => {
    if (err) return callback(err)
    this.client.close()
    if (callback) callback()
  })
}

WsBusPubSub.prototype._subscribe = function (channel, callback) {
  process.nextTick(() => {
    this.client.subscribe(channel, (message) => {
      this._emit(channel, message)
    })
    if (callback) callback()
  })
}

WsBusPubSub.prototype._unsubscribe = function (channel, callback) {
  process.nextTick(() => {
    this.client.unsubscribe(channel)
    if (callback) callback()
  })
}

WsBusPubSub.prototype._publish = function (channels, data, callback) {
  process.nextTick(() => {
    for (let channel of (channels || [])) {
      if (this.subscribed[channel]) {
        this.client.publish(channel, data)
      }
    }
    if (callback) callback()
  })
}
