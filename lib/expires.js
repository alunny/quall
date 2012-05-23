// create Expiration param easily
var MILLISECOND = 1,
    SECOND = MILLISECOND * 1000,
    MINUTE = SECOND * 60,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24;

module.exports = function expires(number, unit) {
    var multiplier = MINUTE,
        offset; // default

    if (unit == 'milliseconds') {
        multiplier = MILLISECOND;
    } else if (unit == 'seconds') {
        multiplier = SECOND;
    } else if (unit == 'minutes') {
        multiplier = MINUTE;
    } else if (unit == 'hours') {
        multiplier = HOUR;
    } else if (unit == 'days') {
        multiplier = DAY;
    }

    offset = number * multiplier;

    return (new Date(+(new Date) + offset)).toISOString();
}
