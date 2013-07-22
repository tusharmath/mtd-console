var fs = require('fs');

var Db = function(file) {
	this.file = file;
};

var readFile = function(callback) {
	fs.readFile(this.file, {
		encoding: 'utf8'
	}, function(err, data) {
		if (data) {
			callback(JSON.parse(data));
		} else {
			callback({});
		}
	});
};

var writeFile = function(content, callback) {
	fs.writeFile(this.file, JSON.stringify(content), {
		encoding: 'utf8'
	}, callback);
};

Db.prototype.get = function(key, callback) {
	readFile.call(this, function(content) {
		callback(content[key] || '');
	});
};

Db.prototype.save = function(key, value, callback) {
	var self = this;
	readFile.call(this, function(content) {
		content[key] = value;
		writeFile.call(self, content, callback);
	});
};

Db.prototype.remove = function(key, callback) {
	var self = this;
	readFile.call(this, function(content) {
		delete content[key];
		writeFile.call(self, content, callback);
	});
};

module.exports = Db;