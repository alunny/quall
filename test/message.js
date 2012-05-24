var Message = require('../lib/message'),
    fs = require('fs'),
    sampleXml = fs.readFileSync('test/receiveMsg.xml', 'utf8');

exports.message = {
    'should have the correct message id': function (test) {
        var msg = new Message(sampleXml);

        test.equal(msg.id, '6e53240c-618a-4b40-89aa-419042053097');
        test.done();
    },

    'should have the correct body': function (test) {
        var msg = new Message(sampleXml);

        test.equal(msg.body, 'hello the world Wed May 23 14:31:26 -0700 2012');
        test.done();
    },

    'should have the correct receipt handle': function (test) {
        var msg = new Message(sampleXml),
            receiptHandle = 'Prl0vft3nRj+P7Ep11UQIrVczLFcw6NADLGtA77U/5IIPnnz6+64YM3M8oUb/uQJoyx+wIbWFK1evaxfBSJskiAGHucv3F6H0suA+uAF4fQj1o2fFyWZoIwHeeO9Qzeuqv3nm/frDrQo+qV/v1xy6T+hVIVpk68xh7go5hlDa/i1h+hnKoC1+A2oAIOwQUl/BDVQ62492xmeVU5git4FOUIhwpqvAt8JDrAPbi8z72L7ccvlA35oyA4Iq25Nv9g19TRpk5j07G9QgZJIJHxSZHMVlsRqsYAn1z9OdHsr1+4=';

        test.equal(msg.receiptHandle, receiptHandle);
        test.done();
    },

    'should have the correct MD5': function (test) {
        var msg = new Message(sampleXml);

        test.equal(msg.md5OfBody, 'b8b363a50f659a261fcba546efa6a124');
        test.done();
    },

    'should have the correct attributes': function (test) {
        var msg = new Message(sampleXml),
            attr = msg.attributes;

        test.equal(attr['SenderId'], '621255880182');
        test.equal(attr['SentTimestamp'], '1337808687163');
        test.equal(attr['ApproximateReceiveCount'], '4');
        test.equal(attr['ApproximateFirstReceiveTimestamp'], '1337812311044');

        test.done();
    }

}
