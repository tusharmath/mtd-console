var _ = require('underscore');
var interval = 1000;
var Display = require('./Display');



var _downloaded = function() {
	return _.reduce(this.threads, function(bytes, thread) {
		return bytes + thread.position - thread.start;
	}, 0);
};

//Should be called on start
var _past_downloaded = function() {
	this.past.downloaded = _downloaded.call(this);
};

var _total_size = function() {
	this.total.size = _.last(this.threads).end - _.first(this.threads).start;
};

//Should be called everytime
var _present_time = function() {
	this.present.time += (interval / 1000);
};

var _total_downloaded = function() {
	this.total.downloaded = _downloaded.call(this);
};

var _present_downloaded = function() {
	this.present.downloaded = this.total.downloaded - this.past.downloaded;
};

var _total_completed = function() {
	this.total.completed = Math.floor((this.total.downloaded) * 10000 / this.total.size) / 100;
};


var _future_remaining = function() {
	this.future.remaining = this.total.size - this.total.downloaded;
};

var _present_speed = function() {
	this.present.speed = this.present.downloaded / this.present.time;
};

var _future_eta = function() {
	this.future.eta = this.future.remaining / this.present.speed;
};

var _present_threadStatus = function() {
	this.present.threadStatus = _.reduce(this.threads, function(memo, thread) {
		memo[thread.connection]++;
		return memo;
	}, {
		open: 0,
		closed: 0,
		failed: 0
	});
};


var Analytics = function() {
	this.past = {
		downloaded: 0
	};

	this.present = {
		downloaded: 0,
		time: 0
	};

	this.future = {};
	this.total = {};
	this.elapsed = 0;
};

var _init = function(threads) {
	this.threads = threads;
	_past_downloaded.call(this);
	_total_size.call(this);
};

var _update = function() {
	_present_time.call(this);
	_total_downloaded.call(this);
	_present_downloaded.call(this);
	_total_completed.call(this);
	_future_remaining.call(this);
	_present_speed.call(this);
	_future_eta.call(this);
	_present_threadStatus.call(this);
};

var _start = function(threads) {
	var self = this;

	_init.call(self, threads);
	Display.newLine();
	self.timer = setInterval(function() {
		_update.call(self);
		Display.show(self);
	}, interval);

	Display.header();
};

var _stop = function() {
	if (this.timer) {
		clearInterval(this.timer);
		_update.call(this);
		Display.show(this);
		Display.newLine();
		Display.newLine();
	}
};

Analytics.prototype.start = _start;
Analytics.prototype.stop = _stop;
module.exports = Analytics;