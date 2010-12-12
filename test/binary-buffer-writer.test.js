const BinaryBufferWriter = require('../lib/binary-buffer').BinaryBufferWriter,
      Endian = require('../lib/binary-buffer').Endian;

exports.writeByte = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeByte(0x11);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x11]))

  test.done();
};

exports.writeByteNegative = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeByte(-30);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0xE2]))

  test.done();
};

exports.writeByteMin = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeByte(0x00);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x00]))

  test.done();
};

exports.writeByteMax = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeByte(0xff);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0xff]))

  test.done();
};

exports.writeByteTooBig = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeByte(0x123);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x23]))

  test.done();
};

exports.writeInt16BE = function(test) {
  var bbw = new BinaryBufferWriter(Endian.Big);
  bbw.writeInt16(0x1234);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x12, 0x34]))

  test.done();
};

exports.writeInt16LE = function(test) {
  var bbw = new BinaryBufferWriter(Endian.Little);
  bbw.writeInt16(0x1234);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x34, 0x12]))

  test.done();
};

exports.writeInt16Negative = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeInt16(-30);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0xFF, 0xE2]))

  test.done();
};

exports.writeInt16Min = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeInt16(0x0000);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x00, 0x00]))

  test.done();
};

exports.writeInt16Max = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeInt16(0xffff);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0xff, 0xff]))

  test.done();
};

exports.writeInt16TooBig = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeInt16(0x12345);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x23, 0x45]))

  test.done();
};

exports.writeInt32BE = function(test) {
  var bbw = new BinaryBufferWriter(Endian.Big);
  bbw.writeInt32(0x12345678);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x12, 0x34, 0x56, 0x78]))

  test.done();
};

exports.writeInt32LE = function(test) {
  var bbw = new BinaryBufferWriter(Endian.Little);
  bbw.writeInt32(0x12345678);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x78, 0x56, 0x34, 0x12]))

  test.done();
};

exports.writeInt32Negative = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeInt32(-30);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0xFF, 0xFF, 0xFF, 0xE2]))

  test.done();
};

exports.writeInt32Min = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeInt32(0x00000000);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x00, 0x00, 0x00, 0x00]))

  test.done();
};

exports.writeInt32Max = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeInt32(0xffffffff);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0xff, 0xff, 0xff, 0xff]))

  test.done();
};

exports.writeInt32TooBig = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeInt32(0x123456789);

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x23, 0x45, 0x67, 0x89]))

  test.done();
};

exports.writeString = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeString('abc');

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x61, 0x62, 0x63]))

  test.done();
};

exports.writeEmptyString = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeString('');

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([]))

  test.done();
};

exports.writeStringZ = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeStringZ('abc');

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x61, 0x62, 0x63, 0x00]))

  test.done();
};

exports.writeEmptyStringZ = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeStringZ('');

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x00]))

  test.done();
};

exports.multipleWritesWithFluency = function(test) {
  var bbw = new BinaryBufferWriter();
  bbw.writeByte(0x11)
    .writeInt16(0x1234)
    .writeInt32(0x12345678)
    .writeString('a')
    .writeStringZ('b');

  var b = bbw.getBuffer();
  test.deepEqual(b, new Buffer([0x11, 0x12, 0x34, 0x12, 0x34, 0x56, 0x78, 0x61, 0x62, 0x00]))

  test.done();
};
