/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.helloworld = (function() {
    
        /**
         * Namespace helloworld.
         * @exports helloworld
         * @namespace
         */
        var helloworld = {};
    
        helloworld.Greeter = (function() {
    
            /**
             * Constructs a new Greeter service.
             * @memberof helloworld
             * @classdesc Represents a Greeter
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function Greeter(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }
    
            (Greeter.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Greeter;
    
            /**
             * Creates new Greeter service using the specified rpc implementation.
             * @function create
             * @memberof helloworld.Greeter
             * @static
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             * @returns {Greeter} RPC service. Useful where requests and/or responses are streamed.
             */
            Greeter.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                return new this(rpcImpl, requestDelimited, responseDelimited);
            };
    
            /**
             * Callback as used by {@link helloworld.Greeter#sayHello}.
             * @memberof helloworld.Greeter
             * @typedef SayHelloCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {helloworld.HelloReply} [response] HelloReply
             */
    
            /**
             * Calls SayHello.
             * @function sayHello
             * @memberof helloworld.Greeter
             * @instance
             * @param {helloworld.IHelloRequest} request HelloRequest message or plain object
             * @param {helloworld.Greeter.SayHelloCallback} callback Node-style callback called with the error, if any, and HelloReply
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(Greeter.prototype.sayHello = function sayHello(request, callback) {
                return this.rpcCall(sayHello, $root.helloworld.HelloRequest, $root.helloworld.HelloReply, request, callback);
            }, "name", { value: "SayHello" });
    
            /**
             * Calls SayHello.
             * @function sayHello
             * @memberof helloworld.Greeter
             * @instance
             * @param {helloworld.IHelloRequest} request HelloRequest message or plain object
             * @returns {Promise<helloworld.HelloReply>} Promise
             * @variation 2
             */
    
            return Greeter;
        })();
    
        helloworld.HelloRequest = (function() {
    
            /**
             * Properties of a HelloRequest.
             * @memberof helloworld
             * @interface IHelloRequest
             * @property {string|null} [name] HelloRequest name
             */
    
            /**
             * Constructs a new HelloRequest.
             * @memberof helloworld
             * @classdesc Represents a HelloRequest.
             * @implements IHelloRequest
             * @constructor
             * @param {helloworld.IHelloRequest=} [properties] Properties to set
             */
            function HelloRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * HelloRequest name.
             * @member {string} name
             * @memberof helloworld.HelloRequest
             * @instance
             */
            HelloRequest.prototype.name = "";
    
            /**
             * Creates a new HelloRequest instance using the specified properties.
             * @function create
             * @memberof helloworld.HelloRequest
             * @static
             * @param {helloworld.IHelloRequest=} [properties] Properties to set
             * @returns {helloworld.HelloRequest} HelloRequest instance
             */
            HelloRequest.create = function create(properties) {
                return new HelloRequest(properties);
            };
    
            /**
             * Encodes the specified HelloRequest message. Does not implicitly {@link helloworld.HelloRequest.verify|verify} messages.
             * @function encode
             * @memberof helloworld.HelloRequest
             * @static
             * @param {helloworld.IHelloRequest} message HelloRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HelloRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                return writer;
            };
    
            /**
             * Encodes the specified HelloRequest message, length delimited. Does not implicitly {@link helloworld.HelloRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof helloworld.HelloRequest
             * @static
             * @param {helloworld.IHelloRequest} message HelloRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HelloRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a HelloRequest message from the specified reader or buffer.
             * @function decode
             * @memberof helloworld.HelloRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {helloworld.HelloRequest} HelloRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HelloRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.helloworld.HelloRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a HelloRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof helloworld.HelloRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {helloworld.HelloRequest} HelloRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HelloRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a HelloRequest message.
             * @function verify
             * @memberof helloworld.HelloRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HelloRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };
    
            /**
             * Creates a HelloRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof helloworld.HelloRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {helloworld.HelloRequest} HelloRequest
             */
            HelloRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.helloworld.HelloRequest)
                    return object;
                var message = new $root.helloworld.HelloRequest();
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };
    
            /**
             * Creates a plain object from a HelloRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof helloworld.HelloRequest
             * @static
             * @param {helloworld.HelloRequest} message HelloRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HelloRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.name = "";
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };
    
            /**
             * Converts this HelloRequest to JSON.
             * @function toJSON
             * @memberof helloworld.HelloRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HelloRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return HelloRequest;
        })();
    
        helloworld.HelloReply = (function() {
    
            /**
             * Properties of a HelloReply.
             * @memberof helloworld
             * @interface IHelloReply
             * @property {string|null} [message] HelloReply message
             */
    
            /**
             * Constructs a new HelloReply.
             * @memberof helloworld
             * @classdesc Represents a HelloReply.
             * @implements IHelloReply
             * @constructor
             * @param {helloworld.IHelloReply=} [properties] Properties to set
             */
            function HelloReply(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * HelloReply message.
             * @member {string} message
             * @memberof helloworld.HelloReply
             * @instance
             */
            HelloReply.prototype.message = "";
    
            /**
             * Creates a new HelloReply instance using the specified properties.
             * @function create
             * @memberof helloworld.HelloReply
             * @static
             * @param {helloworld.IHelloReply=} [properties] Properties to set
             * @returns {helloworld.HelloReply} HelloReply instance
             */
            HelloReply.create = function create(properties) {
                return new HelloReply(properties);
            };
    
            /**
             * Encodes the specified HelloReply message. Does not implicitly {@link helloworld.HelloReply.verify|verify} messages.
             * @function encode
             * @memberof helloworld.HelloReply
             * @static
             * @param {helloworld.IHelloReply} message HelloReply message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HelloReply.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
                return writer;
            };
    
            /**
             * Encodes the specified HelloReply message, length delimited. Does not implicitly {@link helloworld.HelloReply.verify|verify} messages.
             * @function encodeDelimited
             * @memberof helloworld.HelloReply
             * @static
             * @param {helloworld.IHelloReply} message HelloReply message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HelloReply.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a HelloReply message from the specified reader or buffer.
             * @function decode
             * @memberof helloworld.HelloReply
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {helloworld.HelloReply} HelloReply
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HelloReply.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.helloworld.HelloReply();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.message = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a HelloReply message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof helloworld.HelloReply
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {helloworld.HelloReply} HelloReply
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HelloReply.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a HelloReply message.
             * @function verify
             * @memberof helloworld.HelloReply
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HelloReply.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                return null;
            };
    
            /**
             * Creates a HelloReply message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof helloworld.HelloReply
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {helloworld.HelloReply} HelloReply
             */
            HelloReply.fromObject = function fromObject(object) {
                if (object instanceof $root.helloworld.HelloReply)
                    return object;
                var message = new $root.helloworld.HelloReply();
                if (object.message != null)
                    message.message = String(object.message);
                return message;
            };
    
            /**
             * Creates a plain object from a HelloReply message. Also converts values to other types if specified.
             * @function toObject
             * @memberof helloworld.HelloReply
             * @static
             * @param {helloworld.HelloReply} message HelloReply
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HelloReply.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.message = "";
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                return object;
            };
    
            /**
             * Converts this HelloReply to JSON.
             * @function toJSON
             * @memberof helloworld.HelloReply
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HelloReply.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return HelloReply;
        })();
    
        return helloworld;
    })();

    return $root;
});
