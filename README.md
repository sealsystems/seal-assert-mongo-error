# seal-assert-mongo-error

If called with a mongodb error of a predefined (severe error) code it throws the error.

Default list of mongodb error codes to throw:

| Name | Code |
|---|---|
| InternalError |1|
| HostUnreachable |6|
| HostNotFound |7|
| NetworkTimeout | 89 |
| SocketException | 9001 |
| UnknownError |8|
| ProtocolError | 17 |
| IllegalOpMsgFlag | 223 |
| UserNotFound |11|
| Unauthorized |13|
| AuthenticationFailed | 18 |
| InvalidSSLConfiguration | 140 |
| SSLHandshakeFailed | 141 |
| OutOfDiskSpace | 14031 |

## Installation

```bash
$ npm install seal-assert-mongo-error
```

## Quick start

First you need to add a reference to seal-assert-mongo-error within your application, then call the `assert` function in the callback of every mongodb call.

```javascript
const assertMongoError = require('seal-assert-mongo-error');

yourCollection.find({}, (findError, cursor) => {
  assertMongoError.assert(findError);
  ...
});
```

## Set list of error codes

Use the `setCodes` function to set a new list of error codes. This needs to be done only once, e.g. at startup. The new list is available instantly throughout the whole node process.

```javascript
const assertMongoError = require('seal-assert-mongo-error');

assertMongoError.setCodes([1,2,3]);
...
assertMongoError.assert(mongoErrorObject);
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```
