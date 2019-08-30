const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  getExtremeItem() {
    return this.last != null ? this.last : '';
  }

  _transform(chunk, encoding, callback) {
    const lines = (this.getExtremeItem() + chunk)
      .toString()
      .split(os.EOL)
    ;

    this.last = lines.pop();

    lines.forEach(item => this.push(item));

    callback();
  }

  _flush(callback) {
    this.push(this.getExtremeItem());
    callback();
  }
}

module.exports = LineSplitStream;
