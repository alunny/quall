// create a message object from an XML response
var et = require('elementtree')

module.exports = function Message(msg) {
    var attr = {};

    this.id             = msg.find('MessageId').text;
    this.body           = msg.find('Body').text;
    this.receiptHandle  = msg.find('ReceiptHandle').text;
    this.md5OfBody      = msg.find('MD5OfBody').text;

    
    msg.findall('Attribute').forEach(function (attrTag) {
        var name = attrTag.find('Name').text,
            value = attrTag.find('Value').text;

        attr[name] = value;
    });

    this.attributes = attr
}
