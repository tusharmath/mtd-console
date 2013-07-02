#!/usr/bin/env node

var mtd = require('../Node.Downloader');
var Analytics = require('./analytics');
var Operetta = require("operetta").Operetta;
var Formater = require('./Formaters');
operetta = new Operetta();

operetta.banner = 'A multi thread Http Downloader\n';



var _newDownload = function(values) {
	//console.log(values);
	var analytics = new Analytics();
	var options = {
		count: values['-c'],
		method: values['-m'],
		port: values['-p'],
		range: values['-r'],
		timeout: values['-t'],
		onThreadChange: function(threads) {
			analytics.updateThreads(threads);
		},
		onStart: function(response) {
			console.log('Download started');
			console.log('Download Size:', Formater.byteFormater(response.downloadSize));
			analytics.start();
		}
	};
	var url = values['-u'][0];
	var file = values['-f'][0];
	var downloader = new mtd(file, url, options);



	downloader.callback = function(err, result) {

		analytics.stop();
		if (err) {
			console.log('Download failed:', err);
		} else {
			console.log('Download complete:', file);
		}
	};
	console.log('Starting...');
	downloader.start();


};


var _oldDownload = function(values) {
	//console.log(values);
	var analytics = new Analytics();
	var file = values['-f'][0];
	var downloader = new mtd(file, null, {
		onThreadChange: function(threads) {
			analytics.updateThreads(threads);
		}
	});
	downloader.callback = function(err, result) {
		analytics.stop();
		console.log('Download complete:', file);
	};


	downloader.start();
	analytics.start();
	console.log('Download starting...');

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
	command.parameters(['-f', '--file'], 'Path to a .mtd file');
	command.start(_oldDownload);
};



operetta.command('start', 'Start a new download', _newDownloadCommand);
operetta.command('resume', 'Resume an old download', _oldDownloadCommand);
operetta.start();