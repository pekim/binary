const Endian = require('./binary-common').Endian;

const BinaryBufferReader = function(endian) {
  if (endian) {
    if (endian === Endian.Big || endian === Endian.Little) {
      this.endian = endian;
    } else {
      throw new Error('Endian value \'' + endian + '\' not recognised');
    }
  } else {
    // Default.
    this.endian = Endian.Big;
  }

  this.buffers = [];
  this.offset = 0;
  
  this.ensureBytesAvailable = function(numberOfBytes) {
    // Collapse sufficient buffers (at the front of the buffers array) to
    // give us enough bytes in the front buffer to satisfy the requested
    // number of bytes.
    // Hopefully we won't need to do this too often, unless we are provided
    // with lots of tiny buffers.
    if (this.buffers.length == 0) {
      return undefined;
    }
    
    const bytesNeededInBuffer = this.offset + numberOfBytes;
    while (this.buffers[0].length < bytesNeededInBuffer && this.buffers.length > 1) {
      const newBuffer = new Buffer((this.buffers[0].length - this.offset) + this.buffers[1].length);
      this.buffers[0].copy(newBuffer, 0, this.offset);
      this.buffers[1].copy(newBuffer, this.buffers[0].length, 0);
      
      this.buffers.shift();
      this.buffers.shift();
      this.buffers.unshift(newBuffer);
    }
    
    if (this.buffers[0].length < bytesNeededInBuffer) {
      return undefined;
    }
    
    const offset = this.offset;
    this.offset += numberOfBytes;
    
    return offset;
  };
};

const p = BinaryBufferReader.prototype;

p.add = function(buffer) {
  this.buffers.push(buffer);
};

p.readByte = function() {
  const offset = this.ensureBytesAvailable(1);
  if (offset === undefined) {
    return offset;
  }
  
  return this.buffers[0][offset];
};

p.readString = function(length) {
  const offset = this.ensureBytesAvailable(length);
  if (offset === undefined) {
    return offset;
  }
  
  return this.buffers[0].toString('ascii', offset, offset + length);
};

exports.BinaryBufferReader = BinaryBufferReader;
