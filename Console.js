#!/usr/bin/env node

var _ = require('underscore');
var Package = require('./Package.json');
var Commands = require('./Commands');
var cmd = new Commands();
var title = '\nmt-Console (version: ' + Package.version + ')';
console.log(title);
_.times(title.length - 1, function() {
	process.stdout.write('=');
});
console.log('\n');

cmd.execute(process.argv);