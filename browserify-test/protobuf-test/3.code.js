var pb = require('./static.js');

// Example usage of protobuf library: prepare a buffer to send
function set_buffer(pb)
{
    // set fields of gRPC payload
    var payload = { name: "TestString" };

    // create an object
    var message = pb.helloworld.HelloRequest.create(payload);

    // serialize object to buffer
    var buffer = pb.helloworld.HelloRequest.encode(message).finish();

    var n = buffer.length;

    var frame = new Uint8Array(5 + buffer.length);

    frame[0] = 0;                        // 'compressed' flag
    frame[1] = (n & 0xFF000000) >>> 24;  // length: uint32 in network byte order
    frame[2] = (n & 0x00FF0000) >>> 16;
    frame[3] = (n & 0x0000FF00) >>>  8;
    frame[4] = (n & 0x000000FF) >>>  0;

    frame.set(buffer, 5);

    return frame;
}

var frame = set_buffer(pb);
console.log(frame)