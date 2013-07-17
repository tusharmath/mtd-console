var _ = require('underscore');
var Formater = require('./Formaters');

var Display = {};

var _logInline = function(str) {
    //return;
    process.stdout.clearLine(); // clear current text
    process.stdout.cursorTo(0); // move cursor to beginning of line
    process.stdout.write(str.toString()); // write text
};

var _display = function(analytics) {
    var str = Formater.rightPad([
    analytics.total.completed + '%',
    Formater.speedFormater(analytics.present.speed),
    Formater.elapsedTimeFormater(analytics.present.time),
    Formater.remainingTimeFormater(analytics.future.eta),
    Formater.threadStatusFormater(analytics.present.threadStatus)]);
    _logInline(str);
};

Display.header = function() {
    console.log(Formater.rightPad(['Completed', 'Speed', 'Time', 'ETA', 'Status(O, C, F)']));
};

Display.show = _display;
Display.inline = _logInline;
Display.newLine = function() {
    console.log();
};


module.exports = Display;