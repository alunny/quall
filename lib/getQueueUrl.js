var request = require('request'),
    et = require('elementtree'),
    sign = require('./signature'),
    expires = require('./expires'),
    query = require('./defaultQuery'),
    uri = 'https://queue.amazonaws.com/';

// get queue url, pass result back to callback
module.exports = function getQueueUrl(name, credentials, callback) {
    var qs = query(),
        signature;

    qs['Action'] = 'GetQueueUrl';
    qs['Expires'] = expires(5, 'minutes');

    qs['QueueName'] = name;
    qs['AWSAccessKeyId'] = credentials.key;

    qs['Signature'] = sign('GET',
                     'queue.amazonaws.com',
                     '/',
                     qs, credentials.secret);

    request({ uri: uri, qs: qs }, function (err, response, body) {
        if (err) callback(err);

        var doc = et.parse(body),
            url = doc.find('GetQueueUrlResult/QueueUrl')

        callback(null, url.text, body);
    })
}
