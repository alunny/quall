var getQueueUrl = require('./lib/getQueueUrl'),
    receiveMessage = require('./lib/receiveMessage'),
    deleteMessage = require('./lib/deleteMessage');

module.exports = function quall(opts, callback) {
    var creds = opts.awsCredentials;

    console.log('getting queue url for %s', opts.queueName);

    getQueueUrl(opts.queueName, creds, function (err, url, body) {
        if (err) throw err;

        if (url) {
            console.log('url = %s', url);
            console.log('starting to listen');

            var handleMessage = makeHandleMessage(opts, url, creds, callback);

            // TODO: something better
            setInterval(handleMessage, 3000);
        }
    })
}

function makeHandleMessage(opts, url, creds, callback) {
    return function () {
        console.log('checking for message');

        receiveMessage(url, creds, function (err, msg, body) {
            if (msg == null) {
                console.log('no messages on %s', opts.queueName);   
            } else {
                console.log('received message %s', msg.id);   

                if (opts.pop) {
                    deleteMessage(url, msg.receiptHandle, creds, function () {
                        console.log('deleted message %s', msg.id);   
                    });
                }

                callback(null, msg)
            }
        })
    }
}
