#!/usr/bin/env node

var mtd = require('mt-downloader');
var Analytics = require('./analytics');
var optimist = require("optimist");
var Formater = require('./Formaters');
var Package = require('./Package.json');
var _ = require('underscore');



var analytics = new Analytics();

var _onStart = function(response) {
	console.log('Size:', Formater.byteFormater(response.size));
	analytics.start(response.threads);
};

var _onEnd = function(err, result) {
	analytics.stop();
	if (err) console.error(err);
	else console.log('File:', argv.file);
};

var _startDownload = function(cParams) {
	cParams.onStart = _onStart;
	cParams.onEnd = _onEnd;
	var downloader = new mtd(cParams.file, cParams.url, cParams);
	downloader.start();
	console.log('\nMT Console');
};


var argv = optimist.usage('A console app for mt-downloader', {
	'url': {
		description: 'Download url',
		short: 'u'
	},
	'file': {
		description: 'File location on disk',
		short: 'f'
	},
	'count': {
		description: 'Threads count [default: 32]',
		short: 'c'
	},
	'range': {
		description: 'Data download range [default: 0-100]',
		short: 'r'
	},
	'port': {
		description: 'Http Port [default: 80]',
		short: 'p'
	},
	'method': {
		description: 'Http method [default: GET]',
		short: 'm'
	},
	'version': {
		description: 'Shows application verion',
		short: 'v'
	}
})
	.usage('usage:\t$0 [--file[=<path>]] [--url[=<url>]] \tStart a new download\n\t$0 [--file[=<path>]]\t\t\tResume an old download using a .mtd file')
	.argv;

if (argv.version) {
	console.log('MT Console Version:', Package.version);
} else if (!argv.file) {
	optimist.showHelp();
} else {
	_startDownload(argv);
}