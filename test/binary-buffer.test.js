const BinaryBuffer = require('../lib/binary-buffer').BinaryBuffer,
      Endian = require('../lib/binary-buffer').Endian;

exports.writeByte = function(test) {
  var bb = new BinaryBuffer();
  bb.writeByte(0x11);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x11]))

  test.done();
};

exports.writeByteNegative = function(test) {
  var bb = new BinaryBuffer();
  bb.writeByte(-30);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0xE2]))

  test.done();
};

exports.writeByteMin = function(test) {
  var bb = new BinaryBuffer();
  bb.writeByte(0x00);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x00]))

  test.done();
};

exports.writeByteMax = function(test) {
  var bb = new BinaryBuffer();
  bb.writeByte(0xff);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0xff]))

  test.done();
};

exports.writeByteTooBig = function(test) {
  var bb = new BinaryBuffer();
  bb.writeByte(0x123);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x23]))

  test.done();
};

exports.writeInt16BE = function(test) {
  var bb = new BinaryBuffer(Endian.Big);
  bb.writeInt16(0x1234);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x12, 0x34]))

  test.done();
};

exports.writeInt16LE = function(test) {
  var bb = new BinaryBuffer(Endian.Little);
  bb.writeInt16(0x1234);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x34, 0x12]))

  test.done();
};

exports.writeInt16Negative = function(test) {
  var bb = new BinaryBuffer();
  bb.writeInt16(-30);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0xFF, 0xE2]))

  test.done();
};

exports.writeInt16Min = function(test) {
  var bb = new BinaryBuffer();
  bb.writeInt16(0x0000);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x00, 0x00]))

  test.done();
};

exports.writeInt16Max = function(test) {
  var bb = new BinaryBuffer();
  bb.writeInt16(0xffff);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0xff, 0xff]))

  test.done();
};

exports.writeInt16TooBig = function(test) {
  var bb = new BinaryBuffer();
  bb.writeInt16(0x12345);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x23, 0x45]))

  test.done();
};

exports.writeInt32BE = function(test) {
  var bb = new BinaryBuffer(Endian.Big);
  bb.writeInt32(0x12345678);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x12, 0x34, 0x56, 0x78]))

  test.done();
};

exports.writeInt32LE = function(test) {
  var bb = new BinaryBuffer(Endian.Little);
  bb.writeInt32(0x12345678);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x78, 0x56, 0x34, 0x12]))

  test.done();
};

exports.writeInt32Negative = function(test) {
  var bb = new BinaryBuffer();
  bb.writeInt32(-30);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0xFF, 0xFF, 0xFF, 0xE2]))

  test.done();
};

exports.writeInt32Min = function(test) {
  var bb = new BinaryBuffer();
  bb.writeInt32(0x00000000);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x00, 0x00, 0x00, 0x00]))

  test.done();
};

exports.writeInt32Max = function(test) {
  var bb = new BinaryBuffer();
  bb.writeInt32(0xffffffff);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0xff, 0xff, 0xff, 0xff]))

  test.done();
};

exports.writeInt32TooBig = function(test) {
  var bb = new BinaryBuffer();
  bb.writeInt32(0x123456789);

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x23, 0x45, 0x67, 0x89]))

  test.done();
};

exports.writeString = function(test) {
  var bb = new BinaryBuffer();
  bb.writeString('abc');

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x61, 0x62, 0x63]))

  test.done();
};

exports.writeEmptyString = function(test) {
  var bb = new BinaryBuffer();
  bb.writeString('');

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([]))

  test.done();
};

exports.writeStringZ = function(test) {
  var bb = new BinaryBuffer();
  bb.writeStringZ('abc');

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x61, 0x62, 0x63, 0x00]))

  test.done();
};

exports.writeEmptyStringZ = function(test) {
  var bb = new BinaryBuffer();
  bb.writeStringZ('');

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x00]))

  test.done();
};

exports.multipleWritesWithFluency = function(test) {
  var bb = new BinaryBuffer();
  bb.writeByte(0x11)
    .writeInt16(0x1234)
    .writeInt32(0x12345678)
    .writeString('a')
    .writeStringZ('b');

  var b = bb.getBuffer();
  test.deepEqual(b, new Buffer([0x11, 0x12, 0x34, 0x12, 0x34, 0x56, 0x78, 0x61, 0x62, 0x00]))

  test.done();
};
