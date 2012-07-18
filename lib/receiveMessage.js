var parse = require('url').parse,
    request = require('request'),
    et = require('elementtree'),
    sign = require('./signature'),
    expires = require('./expires'),
    query = require('./defaultQuery'),
    Message = require('./message')

// receive message, pass result back to callback
module.exports = function receiveMessage(uri, creds, callback) {
    var qs = query(),
        signature;

    qs['Action'] = 'ReceiveMessage';
    qs['AttributeName'] = 'All';
    qs['MaxNumberOfMessages'] = '5';
    qs['VisibilityTimeout'] = '15';

    qs['Expires'] = expires(5, 'minutes');
    qs['AWSAccessKeyId'] = creds.key;

    qs['Signature'] = sign('GET',
                     parse(uri).host,
                     parse(uri).path,
                     qs, creds.secret);

    request({ uri: uri, qs: qs }, function (err, response, body) {
        if (err) {
            return callback(err);
        } else if (!body) { // body can be undefined sometimes
            return callback(null);
        }

        var doc = et.parse(body),
            messages = doc.findall('ReceiveMessageResult/Message');

        if (!messages.length) {
            callback(null, null, body);
        } else {
            messages.forEach(function (msg) {
                callback(null, new Message(msg), body);
            });
        }
    })
}
