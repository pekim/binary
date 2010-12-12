const Endian = {
    Big: 1,
    Little: 2
}

const BinaryBuffer = function(endian) {
  if (endian) {
    if (endian === Endian.Big || endian === Endian.Little) {
      this.endian = endian;
    } else {
      throw new Error('Endian value \'' + endian + '\' not recognised');
    }
  } else {
    this.endian = Endian.Big;
  }

  this.buffers = [];
  this.totalLength = 0;
};

const p = BinaryBuffer.prototype;

p.addByte = function(byte) {
  this.buffers.push(new Buffer([
    (byte & 0xff)
  ]));
  this.totalLength += 1;
  
  return this;
};

p.addInt16 = function(int) {
  if (this.endian === Endian.Big) {
    return this.addInt16BE(int);
  } else {
    return this.addInt16LE(int);
  }
};

p.addInt16BE = function(int) {
  this.buffers.push(new Buffer([
    (int & 0xffff) >> 8,
    (int & 0xff)
  ]));
  this.totalLength += 2;
  
  return this;
};

p.addInt16LE = function(int) {
  this.buffers.push(new Buffer([
    (int & 0xff),
    (int & 0xffff) >> 8
  ]));
  this.totalLength += 2;
  
  return this;
};

p.addInt32 = function(int) {
  if (this.endian === Endian.Big) {
    return this.addInt32BE(int);
  } else {
    return this.addInt32LE(int);
  }
};

p.addInt32BE = function(int) {
  this.buffers.push(new Buffer([
    (int & 0xffffffff) >> 24,
    (int & 0xffffff) >> 16,
    (int & 0xffff) >> 8,
    (int & 0xff)
  ]));
  this.totalLength += 4;
  
  return this;
};

p.addInt32LE = function(int) {
  this.buffers.push(new Buffer([
    (int & 0xff),
    (int & 0xffff) >> 8,
    (int & 0xffffff) >> 16,
    (int & 0xffffffff) >> 24
  ]));
  this.totalLength += 4;
  
  return this;
};

p.addString = function(string) {
  this.buffers.push(new Buffer(string, 'ascii'));
  this.totalLength += string.length;
  
  return this;
};

p.addStringZ = function(string) {
  this.buffers.push(new Buffer(string, 'ascii'));
  this.totalLength += string.length;
  
  this.addByte(0);
  
  return this;
};

p.getBuffer = function() {
    const allBuffer = new Buffer(this.totalLength);
    var offset = 0;
    
    this.buffers.forEach(function (buffer) {
      buffer.copy(allBuffer, offset, 0);
      offset += buffer.length;
    });
    
    return allBuffer;
};

exports.BinaryBuffer = BinaryBuffer;
exports.Endian = Endian;
