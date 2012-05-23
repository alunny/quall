// generate signature for AWS requests
var crypto = require('crypto'),
    format = require('util').format,
    cq = require('./canonicalizedQuery')

module.exports = function signature(method, host, path, qs, secret) {
    var canon = cq(qs),
        stringToSign = format("%s\n%s\n%s\n%s", method, host, path, canon),
        hmac = crypto.createHmac('sha256', secret);

    hmac.update(stringToSign);
    return hmac.digest('base64');
}
