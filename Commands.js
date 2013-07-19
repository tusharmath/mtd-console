//REQUIRES
var minimist = require('minimist');
var Analytics = require('./analytics');
var mtd = require('mt-downloader');
var f = require('./Formaters');
var Package = require('./Package.json');
var _ = require('underscore');
var Db = require('./Db');

var log = console.log;

//OBJECTS
var analytics = new Analytics();
var store = new Db('config.db');

var Commands = function() {};

var _show_help = function() {
    console.log('Visit: https://github.com/tusharmath/mtd-console');
};

var _set_wd = function(args) {
    store.save('wd', args['set-wd'], function() {
        console.log('Wroking directory updated:', args['set-wd']);
    });
};

var _clear_wd = function() {
    store.remove('wd', function() {
        console.log('Working directory cleared.');
    });
};

var _wd = function() {
    store.get('wd', function(value) {
        if (value) console.log('Working directory:', value);
        console.log('Set working directory using [--set-wd]');
    });
};

var _start_download = function(args) {

    args.onStart = function(data) {

        console.log('Size:', f.byteFormater(data.size));
        analytics.start(data.threads);
    };

    args.onEnd = function(err, data) {
        analytics.stop();
        if (err) console.error(err);
        else console.log('Downloaded:', args.file);
    };

    store.get('wd', function(value) {
        var downloader = new mtd(value + args.file, args.url, args);
        downloader.start();
    });

};

var _show_version = function() {
    log('Version:', Package.version);
};

var _get_action = function(args) {
    if (args.file) return _start_download;
    if (args['set-wd']) return _set_wd;
    if (args['clear-wd']) return _clear_wd;
    if (args['wd']) return _wd;
    if (args['version']) return _show_version;
    if (args['help']) return _show_help;
    return _show_help;
};

Commands.prototype.execute = function(argv) {
    this.args = minimist(argv.slice(2));
    var action = _get_action(this.args);
    action(this.args);
};

module.exports = Commands;