#!/usr/bin/env node
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var debug = require('debug')('lafayette-preserve-mock:cli')

var usage = [
  '',
  'Usage: lafayette-preserve-mock [options]',
  '',
  'Starts mock LafayettePreserve server.',
  '',
  'Options:',
  '    -h, --help   Usage',
  '    -p, --port   Specify which port the server will listen on (default: 3000)',
  '',
].join('\n')

if (argv.h || argv.help) {
  console.log(usage)
  return
}

var port = argv.p || argv.port || process.env.PORT || 3000;

var app = require('../');
app.set('port', port);

var server = app.listen(port, function() {
  debug('Express server listening on port ' + server.address().port);
});
