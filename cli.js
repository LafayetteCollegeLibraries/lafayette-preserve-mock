#!/usr/bin/env node
var fs = require('fs');
var logger = require('morgan')
var argv = require('minimist')(process.argv.slice(2));

if (argv.h || argv.help) {
  fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
  process.exit(0);
}

var port = argv.p || argv.port || process.env.PORT || 3000;
var quiet = argv.q || argv.quiet;

var app = require('./app');
app.set('port', port);
app.set('quiet', quiet)

var server = app.listen(port, function() {
  if (!quiet && app.get('env') === 'development') {
    console.log('Express server listening on port ' + server.address().port);
  }
});
