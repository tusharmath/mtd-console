var _ = require('underscore');

var Formater = require('./Formaters');
var Analytics = function() {
	this.bytes = 0;
	this.size = 0;
	this.completed = 0;
	this.eta = 0;
	this.speed = 0;
};

var interval = 1000;


var _logInline = function(str) {
	process.stdout.clearLine(); // clear current text
	process.stdout.cursorTo(0); // move cursor to beginning of line
	process.stdout.write(str.toString()); // write text
};

var _display = function() {
	var str = Formater.rightPad([
	this.completed + '%',
	Formater.speedFormater(this.speed),
	Formater.elapsedTimeFormater(this.elapsed),
	Formater.remainingTimeFormater(this.eta)]);
	_logInline(str);
};


var _start = function() {
	var self = this;
	self.elapsed = 0;
	this.timer = setInterval(function() {
		self.elapsed += (interval / 1000);
		_display.call(self);
	}, interval);
	console.log(Formater.rightPad(['Completed', 'Speed', 'Time', 'ETA']));
};

var _stop = function() {
	clearInterval(this.timer);
	_display.call(this);
	console.log();
};



var _updateThreads = function(threads) {
	//console.log('d');
	this.bytes = _.reduce(threads, function(bytes, thread) {
		return bytes + thread.position - thread.start;
	}, 0);

	this.size = _.last(threads).end - _.first(threads).start;
	this.completed = Math.floor(this.bytes * 10000 / this.size) / 100;
	this.speed = this.bytes / this.elapsed;
	this.eta = -(this.bytes - this.size) / this.speed;

};

Analytics.prototype.start = _start;
Analytics.prototype.stop = _stop;
Analytics.prototype.updateThreads = _updateThreads;



module.exports = Analytics;