var sig = require('../lib/signature')

exports.signature = {
    "should match my arbitrary example": function (test) {
        var qs = {
            'Action': 'GetQueueUrl',
            'QueueName': 'testQueue',
            'Version': '2011-10-01',
            'SignatureMethod': 'HmacSHA256',
            'Expires': '2011-10-24T22:52:43PST',
            'AWSAccessKeyId': 'SOMEKEY',
            'SignatureVersion': 2
        },
        secret = 'SOMESECRET',
        signature = sig('GET', 'queue.amazonaws.com', '/', qs, secret)

        test.equal(signature, 'fEMi27MVGpEzNxIPTOTzmg9SyNWLfMZUUFiK3bReB80=');
        test.done();
    }
};
