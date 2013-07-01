#!/usr/bin/env node

var mtd = require('mt-downloader');
var Analytics = require('./analytics');
var Operetta = require("operetta").Operetta;
operetta = new Operetta();

operetta.banner = 'A multi thread Http Downloader\n';



var _newDownload = function(values) {
	//console.log(values);
	var analytics = new Analytics();
	var options = {
		count: values.count,
		method: values.method,
		port: values.port,
		range: values.range,
		timeout: values.timeout,
		onThreadChange: function(threads) {
			analytics.updateThreads(threads);
		}
	};
	var url = values['-u'][0];
	var file = values['-f'][0];
	var downloader = new mtd(file, url, options);



	downloader.callback = function() {
		analytics.stop();
		console.log('Download complete:', file);
	};

	downloader.start();
	analytics.start();
	console.log('Download started:', url);
};


var _oldDownload = function(values) {


	var file = values.file;
	var downloader = new mtd(file);
	downloader.callback = function(err, result) {
		console.log('Download complete:', values.file);
	};

	downloader.onStart = function() {
		console.log('Download Started');
	};

	downloader.start();
	console.log('Download started:', values.url);

};

var _newDownloadCommand = function(command) {
	command.parameters(['-u', '--url'], 'download url');
	command.parameters(['-f', '--file'], 'download path');
	command.parameters(['-c', '--count'], 'threads count [default: 32]');
	command.parameters(['-r', '--range'], 'data download range [default: 0-100]');
	command.parameters(['-p', '--port'], 'http Port [default: 80]');
	command.parameters(['-m', '--method'], 'http method [default: GET]');
	command.parameters(['-t', '--timeout'], 'Ddownload timeout [default: 5000]');

	command.start(_newDownload);
};

var _oldDownloadCommand = function(command) {
	command.parameters(['-f', '-file'], 'Path to a .mtd file');
	command.start(_oldDownload);
};



operetta.command('start', 'Start a new download', _newDownloadCommand);
operetta.command('resume', 'Resume an old download', _oldDownloadCommand);
operetta.start();