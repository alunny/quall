var cq = require('../lib/canonicalizedQuery')

exports.signature = {
    "should be the right thing": function (test) {
        var qs = {
            'Action': 'GetQueueUrl',
            'QueueName': 'testQueue',
            'Version': '2011-10-01',
            'SignatureMethod': 'HmacSHA256',
            'Expires': '2011-10-24T22:52:43PST',
            'AWSAccessKeyId': 'ACCESSKEY',
            'SignatureVersion': 2
        },
        theRightThing = 'AWSAccessKeyId=ACCESSKEY&Action=GetQueueUrl&Expires=2011-10-24T22%3A52%3A43PST&QueueName=testQueue&SignatureMethod=HmacSHA256&SignatureVersion=2&Version=2011-10-01';

        test.equal(cq(qs), theRightThing);
        test.done();
    }
};
