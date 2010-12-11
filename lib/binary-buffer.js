var BinaryBuffer = function() {
  this.buffers = [];
  this.totalLength = 0;
};

var p = BinaryBuffer.prototype;

p.addByte = function(byte) {
  this.buffers.push(new Buffer([
    (byte & 0xff)
  ]));
  this.totalLength += 1;
};

p.addInt16 = function(int) {
  this.buffers.push(new Buffer([
    (int & 0xffff) >> 8,
    (int & 0xff)
  ]));
  this.totalLength += 2;
};

p.addInt32 = function(int) {
  this.buffers.push(new Buffer([
    (int & 0xffffffff) >> 24,
    (int & 0xffffff) >> 16,
    (int & 0xffff) >> 8,
    (int & 0xff)
  ]));
  this.totalLength += 4;
};

p.getBuffer = function() {
    var allBuffer = new Buffer(this.totalLength),
        offset = 0;
    
    this.buffers.forEach(function (buffer) {
      buffer.copy(allBuffer, offset, 0);
      offset += buffer.length;
    });
    
    return allBuffer;
};

exports.BinaryBuffer = BinaryBuffer;
