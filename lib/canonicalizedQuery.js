// canonicalized query string
module.exports = function canonicalizedQuery(qs) {
    var strings = [],
        attr;

    for (attr in qs) {
        strings.push(attr + '=' + encodeURIComponent(qs[attr]));
    }

    strings.sort();

    return strings.join('&');
}
