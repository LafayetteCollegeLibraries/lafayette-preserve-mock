#!/usr/bin/env node
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var debug = require('debug')('lafayette-preserve-mock:cli')

if (argv.h || argv.help) {
  fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
  process.exit(0);
}

var port = argv.p || argv.port || process.env.PORT || 3000;

var app = require('../');
app.set('port', port);

var server = app.listen(port, function() {
  debug('Express server listening on port ' + server.address().port);
});
