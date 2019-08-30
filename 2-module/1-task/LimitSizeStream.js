const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.options = options;
  }

  _transform(chunk, encoding, callback) {
    if (chunk.length >= this.options.limit) callback(new LimitExceededError(), chunk);
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
