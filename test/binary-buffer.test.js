var BinaryBuffer = require('../lib/binary-buffer').BinaryBuffer;

exports.BinaryBuffer = function(test) {
  test.ok(BinaryBuffer);

  test.done();
};

exports.oneByte = function(test) {
  var bb = new BinaryBuffer();
  bb.addByte(123);
  var b = bb.getBuffer();
  
  test.equals(b.length, 1);
  test.equals(b[0], 123);

  test.done();
};
