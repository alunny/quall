var getQueueUrl = require('./lib/getQueueUrl'),
    receiveMessage = require('./lib/receiveMessage'),
    deleteMessage = require('./lib/deleteMessage'),
    log = function noop() {};

if (process.logging) log = process.logging('quall');

module.exports = function quall(opts, callback) {
    var creds = opts.awsCredentials;

    log('getting queue url for %queueName', opts);

    getQueueUrl(opts.queueName, creds, function (err, url, body) {
        if (err) throw err;

        if (url) {
            log('url = %url', {url: url});
            log('starting to listen');

            var handleMessage = makeHandleMessage(opts, url, creds, callback);

            // TODO: something better
            setInterval(handleMessage, 3000);
        }
    })
}

function makeHandleMessage(opts, url, creds, callback) {
    return function () {
        // checking for message

        receiveMessage(url, creds, function (err, msg, body) {
            if (msg == null) {
                // nothing here - perhaps emit event?
            } else {
                log('received message %id', msg);

                if (opts.pop) {
                    deleteMessage(url, msg.receiptHandle, creds, function () {
                        log('deleted message %id', msg);
                    });
                }

                callback(null, msg)
            }
        })
    }
}
