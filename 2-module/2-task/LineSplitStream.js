const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const lines = ((this.last != null ? this.last : '') + chunk)
      .toString()
      .split(os.EOL)
    ;

    this.last = lines.pop();

    lines.forEach(item => this.push(item));

    callback();
  }

  _flush(callback) {
    this.push(this.last != null ? this.last : '');
    callback();
  }
}

module.exports = LineSplitStream;
