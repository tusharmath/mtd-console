var _ = require('underscore');
var Analytics = function() {
	this.bytes = 0;
	this.size = 0;
	this.completed = 0;
	this.eta = 0;
	this.speed = 0;
};
var interval = 1000;

var _ceil = function(val) {
	return Math.ceil(val);
};

var _formatSpeed = function(speed) {

	var str;
	if (speed > 1024 * 1024) str = _ceil(speed / (1024 * 1024)) + ' mbps';
	if (speed > 1024) str = _ceil(speed / 1024) + ' kbps';
	else str = _ceil(speed) + ' bps';
	return str + ' ';
};


var _formatTime = function(seconds) {
	return _ceil(seconds) + 's ';
};


var _logInline = function(str) {
	process.stdout.clearLine(); // clear current text
	process.stdout.cursorTo(0); // move cursor to beginning of line
	process.stdout.write(str.toString()); // write text
};

var _display = function() {
	this.elapsed += (interval / 1000);
	_logInline(this.completed + '% ' + _formatSpeed(this.speed) + _formatTime(this.elapsed) + _formatTime(this.eta));
};



var _start = function() {
	var self = this;
	self.elapsed = 0;
	this.timer = setInterval(function() {
		_display.call(self);
	}, interval);
};

var _stop = function() {
	clearInterval(this.timer);
	_display.call(this);
	console.log('\n');
};



var _updateThreads = function(threads) {
	//console.log('d');
	this.bytes = _.reduce(threads, function(bytes, thread) {
		return bytes + thread.position - thread.start;
	}, 0);

	this.size = _.last(threads).end - _.first(threads).start;
	this.completed = _ceil(this.bytes * 100 / this.size);
	this.speed = this.bytes / this.elapsed;
	this.eta = (this.bytes - this.size) / this.speed;

};

Analytics.prototype.start = _start;
Analytics.prototype.stop = _stop;
Analytics.prototype.updateThreads = _updateThreads;



module.exports = Analytics;