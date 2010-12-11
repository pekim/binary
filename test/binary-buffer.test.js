var BinaryBuffer = require('../lib/binary-buffer').BinaryBuffer;

exports.BinaryBuffer = function(test) {
  test.ok(BinaryBuffer);

  test.done();
};

exports.oneByte = function(test) {
  var bb = new BinaryBuffer();
  bb.addByte(0x11);
  var b = bb.getBuffer();
  
  test.deepEqual(b, new Buffer([0x11]))

  test.done();
};

exports.twoBytes = function(test) {
  var bb = new BinaryBuffer();
  bb.addByte(0x11);
  bb.addByte(0x22);
  var b = bb.getBuffer();

  test.deepEqual(b, new Buffer([0x11, 0x22]))

  test.done();
};
