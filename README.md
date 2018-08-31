# @sealsystems/assert-mongo-error

[![CircleCI](https://circleci.com/gh/sealsystems/node-assert-mongo-error.svg?style=svg)](https://circleci.com/gh/sealsystems/node-assert-mongo-error)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/knnocd1ddkfbaou0?svg=true)](https://ci.appveyor.com/project/Plossys/node-assert-mongo-error)

Test for a servere mongodb error and handle it by exiting the process, throwing a new generated `@sealsystems/error` error object or just ignore the error.

Default list of severe mongodb error codes to exit:

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
$ npm install @sealsystems/assert-mongo-error
```

## Quick start

First you need to add a reference to @sealsystems/assert-mongo-error within your application, then call the `assert` function in the callback of every mongodb call.

```javascript
const assertMongoError = require('@sealsystems/assert-mongo-error');

yourCollection.find({}, (findError, cursor) => {
  assertMongoError.assert(findError);
  ...
});
```

## Assert Error

Test for a servere mongodb error. The function has three outcomes:

- In case of a severe mongodb error exit the process
- Without any of the optional parameters the mongodb error is ignored and the function returns.
- If at least an error message is given as second parameter it throws a new created error of type `@sealsystems/error`. The original mongodb error is chained to the new error.

```javascript
assertMongoError.assert(error, message, code, metadata);
```

Parameters:
```
error      object  mandatory  The error object to test
message    string  optional   Message used for creating a new error object
code       number  optional   Code used for creating a new error object
metadata   object  optional   Metadata used for creating a new error object
```

## Set list of error codes

Use the `setCodes` function to set a new list of error codes. This needs to be done only once, e.g. at startup. The new list is available instantly throughout the whole node process.

```javascript
const assertMongoError = require('@sealsystems/assert-mongo-error');

assertMongoError.setCodes([1,2,3]);
...
assertMongoError.assert(mongoErrorObject);
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```
