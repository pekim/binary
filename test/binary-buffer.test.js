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

exports.addByteMin = function(test) {
  var bb = new BinaryBuffer();
  bb.addByte(0x00);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x00]))

  test.done();
};

exports.addByteMax = function(test) {
  var bb = new BinaryBuffer();
  bb.addByte(0xff);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0xff]))

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

exports.addInt16Min = function(test) {
  var bb = new BinaryBuffer();
  bb.addInt16(0x0000);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x00, 0x00]))

  test.done();
};

exports.addInt16Max = function(test) {
  var bb = new BinaryBuffer();
  bb.addInt16(0xffff);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0xff, 0xff]))

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

exports.addInt32Min = function(test) {
  var bb = new BinaryBuffer();
  bb.addInt32(0x00000000);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x00, 0x00, 0x00, 0x00]))

  test.done();
};

exports.addInt32Max = function(test) {
  var bb = new BinaryBuffer();
  bb.addInt32(0xffffffff);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0xff, 0xff, 0xff, 0xff]))

  test.done();
};

exports.addInt32TooBig = function(test) {
  var bb = new BinaryBuffer();
  bb.addInt32(0x123456789);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x23, 0x45, 0x67, 0x89]))

  test.done();
};

exports.addString = function(test) {
  var bb = new BinaryBuffer();
  bb.addString('abc');

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x61, 0x62, 0x63]))

  test.done();
};

exports.addEmptyString = function(test) {
  var bb = new BinaryBuffer();
  bb.addString('');

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([]))

  test.done();
};

exports.addStringZ = function(test) {
  var bb = new BinaryBuffer();
  bb.addStringZ('abc');

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x61, 0x62, 0x63, 0x00]))

  test.done();
};

exports.addEmptyStringZ = function(test) {
  var bb = new BinaryBuffer();
  bb.addStringZ('');

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x00]))

  test.done();
};

exports.multipleAdds = function(test) {
  var bb = new BinaryBuffer();
  bb.addByte(0x11);
  bb.addInt16(0x1234);
  bb.addInt32(0x12345678);
  bb.addString('a');
  bb.addStringZ('b');

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x11, 0x12, 0x34, 0x12, 0x34, 0x56, 0x78, 0x61, 0x62, 0x00]))

  test.done();
};
