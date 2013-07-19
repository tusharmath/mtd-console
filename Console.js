#!/usr/bin/env node

var Commands = require('./Commands');
var cmd = new Commands();
console.log('\nmt Console');
console.log('==========\n');

cmd.execute(process.argv);