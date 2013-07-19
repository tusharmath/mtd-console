var moment = require('moment');
var _ = require('underscore');
var col = 20;

var _floor = function(val) {
	return Math.floor(val);
};

var _rightPad = function(memo, str) {
	return memo + str + (new Array(col - str.length)).join(' ');
};

exports.elapsedTimeFormater = function(seconds) {
	return _floor(seconds) + 's';
};


exports.remainingTimeFormater = function(seconds) {
	return moment.duration(seconds, 'seconds').humanize();
};

exports.byteFormater = function(bytes) {
	var str;
	if (bytes > 1024 * 1024 * 1024) str = _floor(bytes * 100 / (1024 * 1024 * 1024)) / 100 + ' GB';
	else if (bytes > 1024 * 1024) str = _floor(bytes * 100 / (1024 * 1024)) / 100 + ' MB';
	else if (bytes > 1024) str = _floor(bytes * 100 / 1024) / 100 + ' KB';
	else str = _floor(bytes) + ' Bytes';
	return str;

};

exports.speedFormater = function(speed) {
	var str;
	speed *= 8;
	if (speed > 1024 * 1024) str = _floor(speed * 100 / (1024 * 1024)) / 100 + ' Mbps';
	else if (speed > 1024) str = _floor(speed * 100 / 1024) / 100 + ' Kbps';
	else str = _floor(speed) + ' bps';
	return str + ' ';
};

exports.rightPad = function(list) {
	return _.reduce(list, _rightPad, '');
};

exports.threadStatusFormater = function(status) {
	return [status.idle, status.open, status.closed, status.failed].join(', ');
};