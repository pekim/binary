const BinaryBufferReader = require('../lib/binary-buffer').BinaryBufferReader,
      Endian = require('../lib/binary-buffer').Endian;

exports.readByte = function(test) {
  var bbr = new BinaryBufferReader();
  bbr.add(new Buffer([0x11]));

  var int = bbr.readByte();
  test.equals(int, 0x11)

  test.done();
};

exports.readString = function(test) {
  var bbr = new BinaryBufferReader();
  bbr.add(new Buffer([0x61, 0x62, 0x63]));

  var string = bbr.readString(3);
  test.equals(string, 'abc')

  test.done();
};
