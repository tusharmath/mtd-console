var moment = require('moment');
var _ = require('underscore');
var col = 15;

var _floor = function(val) {
	return Math.floor(val);
};

var _rightPad = function(memo, str) {
	return memo + str + (new Array(col - str.length)).join(' ');
};

exports.elapsedTimeFormater = function(seconds) {
	return _floor(seconds) + 's ';
};


exports.remainingTimeFormater = function(seconds) {
	return moment.duration(seconds, 'seconds').humanize();
};

exports.byteFormater = function(bytes) {
	var str;
	if (speed > 1024 * 1024 * 1024) str = _floor(speed * 100 / (1024 * 1024 * 1024)) / 100 + ' GB';
	else if (speed > 1024 * 1024) str = _floor(speed * 100 / (1024 * 1024)) / 100 + ' MB';
	else if (speed > 1024) str = _floor(speed * 100 / 1024) / 100 + ' KB';
	else str = _floor(speed) + ' Bytes';
	return str;

};

exports.speedFormater = function(speed) {
	var str;
	speed *= 8;
	if (speed > 1024 * 1024) str = _floor(speed * 100 / (1024 * 1024)) / 100 + ' mbps';
	else if (speed > 1024) str = _floor(speed * 100 / 1024) / 100 + ' kbps';
	else str = _floor(speed) + ' bps';
	return str + ' ';
};

exports.rightPad = function(list) {
	return _.reduce(list, _rightPad, '');
};