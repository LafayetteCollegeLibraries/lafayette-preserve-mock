lafayette-preserve-mock
=======================

An [Express][1] server used to mock responses similar to those from
LafayettePreserve, a modified [Hydra Head][2] application for Lafayette
College.

Usage
-----

```
npm install --save-dev lafayette-preserve-mock
```

```javascript
var server = require('lafayette-preserve-mock')
server.listen(3000, function () {
  console.log('lafayette-preserve-mock running on port 3000')
})
```

Also included is a thin command-line wrapper:

    Usage: lafayette-preserve-mock [options]

    Starts mock LafayettePreserve server.

    Options:
        -h, --help   Usage
        -p, --port   Specify which port the server will listen on (default: 3000)

This is useful for including the package within your project's `package.json`
scripts field.

```json
{
  "scripts": {
    "dev-server": "lafayette-preserve-mock",
    "test": "npm run dev-server --port=8081 & npm run tests"
  }
}
```

[1]: http://expressjs.com
[2]: https://projecthydra.org
