#!/usr/bin/env node

var mtd = require('mt-downloader');
var Operetta = require("operetta").Operetta;
operetta = new Operetta();

operetta.banner = 'A multi thread Http Downloader\n';


var _newDownload = function(values) {
	console.log(values);
	var options = {
		count: values.count,
		method: values.method,
		port: values.port,
		range: values.range,
		timeout: values.timeout
	};
	var url = values.url;
	var file = values.file;
	var downloader = new mtd(file, url, options);

	downloader.callback = function() {
		console.log('Download complete:', values.file);
	};

	downloader.start();
	console.log('Download started:', values.url);
};


var _oldDownload = function(values) {


	var file = values.file;
	var downloader = new mtd(file);
	downloader.callback = function() {
		console.log('Download complete:', values.file);
	};

	downloader.start();
	console.log('Download started:', values.url);

};

var _newDownloadCommand = function(command) {
	command.parameters(['-u', '-url'], 'Download url');
	command.parameters(['-f', '-file'], 'Download path');

	command.parameters(['-c', '-count'], 'Threads count [default: 32]');
	command.parameters(['-r', '-range'], 'Data download range [default: 0-100]');
	command.parameters(['-p', '-port'], 'Http Port [default: 80]');
	command.parameters(['-m', '-method'], 'Http method [default: GET]');
	command.parameters(['-t', '-timeout'], 'Download timeout [default: 5000]');

	command.start(_newDownload);
};

var _oldDownloadCommand = function(command) {
	command.parameters(['-f', '-file'], 'Path to .mtd file');
	command.start(_oldDownload);
};



operetta.command('start', 'Start a new download', _newDownloadCommand);
operetta.command('resume', 'Resume an old download', _oldDownloadCommand);
operetta.start();
