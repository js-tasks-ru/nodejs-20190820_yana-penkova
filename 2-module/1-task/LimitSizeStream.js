const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.options = options;
    this.size = 0;
  }

  _transform(chunk, encoding, callback) {
    this.size += chunk.length;
    if (this.size >= this.options.limit) callback(new LimitExceededError(), chunk);
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
