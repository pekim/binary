var BinaryBuffer = require('../lib/binary-buffer').BinaryBuffer;

exports.BinaryBuffer = function(test) {
  test.ok(BinaryBuffer);

  test.done();
};

exports.addByte = function(test) {
  var bb = new BinaryBuffer();
  bb.addByte(0x11);
  var b = bb.getBuffer();
  
  test.deepEqual(b, new Buffer([0x11]))

  test.done();
};

exports.addByteTooBig = function(test) {
  var bb = new BinaryBuffer();
  bb.addByte(0x123);
  var b = bb.getBuffer();
  
  test.deepEqual(b, new Buffer([0x23]))

  test.done();
};

exports.addInt16 = function(test) {
  var bb = new BinaryBuffer();
  bb.addInt16(0x1234);
  var b = bb.getBuffer();
  
  test.deepEqual(b, new Buffer([0x12, 0x34]))

  test.done();
};

exports.addInt16TooBig = function(test) {
  var bb = new BinaryBuffer();
  bb.addInt16(0x12345);
  var b = bb.getBuffer();
  
  test.deepEqual(b, new Buffer([0x23, 0x45]))

  test.done();
};

exports.addInt32 = function(test) {
  var bb = new BinaryBuffer();
  bb.addInt32(0x12345678);
  var b = bb.getBuffer();
  
  test.deepEqual(b, new Buffer([0x12, 0x34, 0x56, 0x78]))

  test.done();
};

exports.addInt32TooBig = function(test) {
  var bb = new BinaryBuffer();
  bb.addInt32(0x123456789);
  var b = bb.getBuffer();
  
  test.deepEqual(b, new Buffer([0x23, 0x45, 0x67, 0x89]))

  test.done();
};

exports.multipleAdds = function(test) {
  var bb = new BinaryBuffer();
  bb.addByte(0x11);
  bb.addInt16(0x1234);
  var b = bb.getBuffer();

  test.deepEqual(b, new Buffer([0x11, 0x12, 0x1234]))

  test.done();
};
