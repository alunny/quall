var parse = require('url').parse,
    request = require('request'),
    et = require('elementtree'),
    sign = require('./signature'),
    expires = require('./expires'),
    query = require('./defaultQuery');

// delete message identified by receiptHandle
module.exports = function deleteMessage(uri, receiptHandle, creds, callback) {
    var qs = query(),
        signature;

    qs['Action'] = 'DeleteMessage';
    qs['ReceiptHandle'] = receiptHandle;

    qs['Expires'] = expires(5, 'minutes');
    qs['AWSAccessKeyId'] = creds.key;

    qs['Signature'] = sign('GET',
                     parse(uri).host,
                     parse(uri).path,
                     qs, creds.secret);

    request({ uri: uri, qs: qs }, function (err, response, body) {
        if (err) callback(err);

        var doc = et.parse(body)

        callback(null, doc, body);
    })
}
