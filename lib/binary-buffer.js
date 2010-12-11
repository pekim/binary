var BinaryBuffer = function() {
  this.buffers = [];
  this.totalLength = 0;
};

var p = BinaryBuffer.prototype;

p.addByte = function(byte) {
  this.buffers.push(new Buffer([byte]));
  this.totalLength += 1;
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
